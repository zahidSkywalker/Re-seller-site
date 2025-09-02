import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const passwordHash = await bcrypt.hash('password123', 10)

	const alice = await prisma.user.upsert({
		where: { email: 'alice@example.com' },
		update: {},
		create: { email: 'alice@example.com', name: 'Alice', password: passwordHash },
	})

	const bob = await prisma.user.upsert({
		where: { email: 'bob@example.com' },
		update: {},
		create: { email: 'bob@example.com', name: 'Bob', password: passwordHash },
	})

	const listing = await prisma.listing.create({
		data: {
			title: 'Tech Blog Sponsored Post',
			description: 'Publish a sponsored article on a high DA tech blog',
			priceCents: 15000,
			publisherId: alice.id,
		},
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