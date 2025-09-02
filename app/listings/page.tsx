import Container from '@/components/Container'
import { prisma } from '@/lib/prisma'

export default async function ListingsPage() {
	const listings = await prisma.listing.findMany({ include: { publisher: true } })
	return (
		<Container>
			<div className="py-12">
				<h1 className="text-2xl font-semibold">Listings</h1>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{listings.map((l) => (
						<div key={l.id} className="rounded-xl border bg-white p-6 shadow-sm">
							<h3 className="text-lg font-semibold">{l.title}</h3>
							<p className="mt-2 text-sm text-gray-600">{l.description}</p>
							<p className="mt-4 text-sm font-medium">${(l.priceCents / 100).toFixed(2)}</p>
							<p className="mt-1 text-xs text-gray-500">by {l.publisher.email}</p>
						</div>
					))}
				</div>
			</div>
		</Container>
	)
}