"use client"
import Container from '@/components/Container'
import { useEffect, useState } from 'react'

async function fetchListings(q: string) {
	const params = new URLSearchParams()
	if (q) params.set('q', q)
	const res = await fetch(`/api/listings?${params.toString()}`, { cache: 'no-store' })
	const data = await res.json()
	return data.listings as Array<any>
}

export default function ListingsPage() {
	const [listings, setListings] = useState<any[]>([])
	const [query, setQuery] = useState('')

	useEffect(() => {
		fetchListings(query).then(setListings)
	}, [query])

	async function buy(listingId: string) {
		const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ listingId }) })
		const data = await res.json()
		if (res.ok && data.url) window.location.href = data.url
	}

	return (
		<Container>
			<div className="py-12">
				<h1 className="text-2xl font-semibold">Listings</h1>
				<div className="mt-4">
					<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-full max-w-md rounded-md border px-3 py-2" />
				</div>
				<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{listings.map((l) => (
						<div key={l.id} className="rounded-xl border bg-white p-6 shadow-sm">
							<h3 className="text-lg font-semibold">{l.title}</h3>
							<p className="mt-2 text-sm text-gray-600">{l.description}</p>
							<p className="mt-4 text-sm font-medium">${(l.priceCents / 100).toFixed(2)}</p>
							<button className="btn-primary mt-4" onClick={() => buy(l.id)}>Buy</button>
						</div>
					))}
				</div>
			</div>
		</Container>
	)
}