"use client"
import { useState } from 'react'
import Container from '@/components/Container'
import Button from '@/components/ui/Button'

export default function PublisherListingsPage() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('150')
	const [message, setMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setMessage(null)
		setLoading(true)
		try {
			const res = await fetch('/api/listings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, description, priceCents: Math.round(Number(price) * 100) }),
			})
			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.error ? 'Validation failed' : 'Failed to create listing')
			}
			setTitle('')
			setDescription('')
			setPrice('150')
			setMessage('Listing created!')
		} catch (err: any) {
			setMessage(err.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container>
			<div className="mx-auto max-w-2xl py-12">
				<h1 className="text-2xl font-semibold">Your Listings</h1>
				<form onSubmit={onSubmit} className="mt-6 space-y-4">
					<input className="w-full rounded-md border px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
					<textarea className="w-full rounded-md border px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
					<input className="w-full rounded-md border px-3 py-2" placeholder="Price (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
					<Button disabled={loading}>{loading ? 'Creating...' : 'Create listing'}</Button>
				</form>
				{message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
			</div>
		</Container>
	)
}