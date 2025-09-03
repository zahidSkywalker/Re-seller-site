import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { env } from '@/env'

export async function POST(req: Request) {
	if (!env.STRIPE_SECRET_KEY || !env.STRIPE_WEBHOOK_SECRET) return new NextResponse('Stripe not configured', { status: 400 })
	const body = await req.text()
	const sig = req.headers.get('stripe-signature')
	if (!sig) return new NextResponse('Missing signature', { status: 400 })

	const stripe = new Stripe(env.STRIPE_SECRET_KEY)
	let event: Stripe.Event
	try {
		event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET)
	} catch (err: any) {
		return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
	}

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as any
		if (session.id) {
			await prisma.order.updateMany({
				where: { stripeSessionId: session.id },
				data: { status: 'PAID', paidAt: new Date(), stripePaymentIntentId: session.payment_intent as string },
			})
		}
	}

	return NextResponse.json({ received: true })
}