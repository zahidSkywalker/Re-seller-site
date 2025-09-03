import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/server/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const q = searchParams.get('q')?.toLowerCase()
	const listings = await prisma.listing.findMany({
		where: q ? {
			OR: [
				{ title: { contains: q, mode: 'insensitive' } },
				{ description: { contains: q, mode: 'insensitive' } },
			],
		} : undefined,
		include: { publisher: true },
		orderBy: { createdAt: 'desc' },
	})
	return NextResponse.json({ listings })
}

const CreateListingSchema = z.object({
	title: z.string().min(3).max(120),
	description: z.string().min(10).max(1000),
	priceCents: z.number().int().min(100),
})

export async function POST(req: Request) {
	const session = (await getServerSession(authConfig as any)) as any
	if (!session?.user?.id) {
		return new NextResponse('Unauthorized', { status: 401 })
	}
	const json = await req.json().catch(() => null)
	const parsed = CreateListingSchema.safeParse(json)
	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
	}
	const { title, description, priceCents } = parsed.data
	const created = await prisma.listing.create({
		data: { title, description, priceCents, publisherId: session.user.id },
	})
	return NextResponse.json({ listing: created }, { status: 201 })
}