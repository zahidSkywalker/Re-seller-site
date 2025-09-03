import Container from '@/components/Container'
import { prisma } from '@/lib/prisma'

export default async function PublisherPage({ params }: { params: { id: string } }) {
	const publisher = await prisma.user.findUnique({
		where: { id: params.id },
		include: {
			listings: true,
			reviews: { include: { listing: true } },
		},
	})
	if (!publisher) return <Container><div className="py-12">Not found</div></Container>
	return (
		<Container>
			<div className="py-12">
				<h1 className="text-2xl font-semibold">{publisher.name ?? publisher.email}</h1>
				{publisher.bio && <p className="mt-2 text-gray-600">{publisher.bio}</p>}
				<h2 className="mt-8 text-lg font-semibold">Listings</h2>
				<div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{publisher.listings.map((l) => (
						<div key={l.id} className="rounded-xl border bg-white p-6 shadow-sm">
							<h3 className="text-lg font-semibold">{l.title}</h3>
							<p className="mt-2 text-sm text-gray-600">{l.description}</p>
						</div>
					))}
				</div>
				<h2 className="mt-8 text-lg font-semibold">Reviews</h2>
				<ul className="mt-4 space-y-3">
					{publisher.reviews.map((r) => (
						<li key={r.id} className="rounded-lg border p-4">
							<p className="text-sm">Rating: {r.rating} / 5</p>
							{r.comment && <p className="text-sm text-gray-600">{r.comment}</p>}
							<p className="text-xs text-gray-500">for {r.listing.title}</p>
						</li>
					))}
				</ul>
			</div>
		</Container>
	)
}