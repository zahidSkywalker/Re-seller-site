import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const passwordHash = await bcrypt.hash('password123', 10)

	const alice = await prisma.user.upsert({
		where: { email: 'alice@example.com' },
		update: {},
		create: { email: 'alice@example.com', name: 'Alice', password: passwordHash, bio: 'Publisher of a tech blog' },
	})

	const bob = await prisma.user.upsert({
		where: { email: 'bob@example.com' },
		update: {},
		create: { email: 'bob@example.com', name: 'Bob', password: passwordHash, bio: 'Content marketer' },
	})

	const tech = await prisma.category.upsert({
		where: { slug: 'tech' },
		update: {},
		create: { name: 'Technology', slug: 'tech' },
	})
	const business = await prisma.category.upsert({
		where: { slug: 'business' },
		update: {},
		create: { name: 'Business', slug: 'business' },
	})

	const listing = await prisma.listing.create({
		data: {
			title: 'Tech Blog Sponsored Post',
			description: 'Publish a sponsored article on a high DA tech blog',
			priceCents: 15000,
			publisherId: alice.id,
			categories: {
				create: [
					{ categoryId: tech.id },
					{ categoryId: business.id },
				],
			},
		},
	})

	await prisma.review.create({
		data: {
			rating: 5,
			comment: 'Great collaboration and fast turnaround!',
			reviewerId: bob.id,
			listingId: listing.id,
		},
	})

	const conversation = await prisma.conversation.upsert({
		where: { buyerId_publisherId: { buyerId: bob.id, publisherId: alice.id } },
		update: {},
		create: { buyerId: bob.id, publisherId: alice.id },
	})

	await prisma.message.createMany({
		data: [
			{ conversationId: conversation.id, senderId: bob.id, content: 'Hi Alice, interested in a sponsored post.' },
			{ conversationId: conversation.id, senderId: alice.id, content: 'Hi Bob, sure! Please share your brief.' },
		],
	})

	await prisma.order.create({
		data: {
			buyerId: bob.id,
			listingId: listing.id,
			status: 'PENDING',
		},
	})

	console.log('Seeded successfully')
}

main().catch((e) => {
	console.error(e)
	process.exit(1)
}).finally(async () => {
	await prisma.$disconnect()
})