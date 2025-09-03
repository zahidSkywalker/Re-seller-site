import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/server/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const otherUserId = searchParams.get('userId')
	const session = (await getServerSession(authConfig as any)) as any
	if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 })
	if (!otherUserId) return new NextResponse('Missing userId', { status: 400 })

	let convo = await prisma.conversation.findFirst({
		where: {
			OR: [
				{ buyerId: session.user.id, publisherId: otherUserId },
				{ buyerId: otherUserId, publisherId: session.user.id },
			],
		},
	})
	if (!convo) {
		convo = await prisma.conversation.create({ data: { buyerId: session.user.id, publisherId: otherUserId } })
	}
	const messages = await prisma.message.findMany({ where: { conversationId: convo.id }, orderBy: { createdAt: 'asc' } })
	return NextResponse.json({ conversationId: convo.id, messages })
}

const PostSchema = z.object({ userId: z.string().min(1), content: z.string().min(1).max(2000) })

export async function POST(req: Request) {
	const session = (await getServerSession(authConfig as any)) as any
	if (!session?.user?.id) return new NextResponse('Unauthorized', { status: 401 })
	const json = await req.json().catch(() => null)
	const parsed = PostSchema.safeParse(json)
	if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

	const { userId, content } = parsed.data
	let convo = await prisma.conversation.findFirst({
		where: {
			OR: [
				{ buyerId: session.user.id, publisherId: userId },
				{ buyerId: userId, publisherId: session.user.id },
			],
		},
	})
	if (!convo) {
		convo = await prisma.conversation.create({ data: { buyerId: session.user.id, publisherId: userId } })
	}
	const message = await prisma.message.create({ data: { conversationId: convo.id, senderId: session.user.id, content } })
	return NextResponse.json({ message }, { status: 201 })
}