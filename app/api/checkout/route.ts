import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/server/auth'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'

const BodySchema = z.object({ listingId: z.string().min(1) })

export async function POST(req: Request) {
	if (!env.STRIPE_SECRET_KEY) return new NextResponse('Stripe not configured', { status: 400 })
	const sessionData = await getServerSession(authConfig as any)
	if (!sessionData?.user?.id) return new NextResponse('Unauthorized', { status: 401 })

	const json = await req.json().catch(() => null)
	const parsed = BodySchema.safeParse(json)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

	const listing = await prisma.listing.findUnique({ where: { id: parsed.data.listingId } })
	if (!listing) return new NextResponse('Listing not found', { status: 404 })

	const stripe = new Stripe(env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
	const checkout = await stripe.checkout.sessions.create({
		mode: 'payment',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					unit_amount: listing.priceCents,
					product_data: { name: listing.title, description: listing.description },
				},
				quantity: 1,
			},
		],
		success_url: `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/checkout/cancel`,
		metadata: { buyerId: sessionData.user.id, listingId: listing.id },
	})

	await prisma.order.create({
		data: {
			buyerId: sessionData.user.id,
			listingId: listing.id,
			status: 'PENDING',
			stripeSessionId: checkout.id,
		},
	})

	return NextResponse.json({ url: checkout.url })
}