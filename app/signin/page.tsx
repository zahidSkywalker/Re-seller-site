"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Container from '@/components/Container'
import Button from '@/components/ui/Button'

export default function SignInPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		const res = await signIn('credentials', { email, password, redirect: false })
		if (res?.error) setError('Invalid credentials')
		else window.location.href = '/dashboard'
	}

	return (
		<Container>
			<div className="mx-auto max-w-md py-24">
				<h1 className="text-2xl font-semibold">Sign in</h1>
				<form onSubmit={onSubmit} className="mt-6 space-y-4">
					<input className="w-full rounded-md border px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="w-full rounded-md border px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					{error && <p className="text-sm text-red-600">{error}</p>}
					<Button className="w-full" type="submit">Sign in</Button>
				</form>
				<p className="mt-4 text-sm text-gray-600">Hint: Use alice@example.com / password123 after seeding.</p>
			</div>
		</Container>
	)
}