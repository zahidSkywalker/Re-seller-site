import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Container from '@/components/Container'
import { authConfig } from '@/server/auth'

export default async function DashboardPage() {
	const session = (await getServerSession(authConfig as any)) as any
	return (
		<Container>
			<div className="py-12">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				{!session?.user ? (
					<p className="mt-4">You are not signed in. <Link href="/signin" className="text-brand">Sign in</Link></p>
				) : (
					<div className="mt-6 space-y-4">
						<p>Welcome, {session.user.email}</p>
						<div className="grid gap-4 sm:grid-cols-2">
							<Link href="/listings" className="rounded-lg border p-4 hover:shadow">Browse Listings</Link>
							<Link href="/publisher/listings" className="rounded-lg border p-4 hover:shadow">Your Listings</Link>
						</div>
					</div>
				)}
			</div>
		</Container>
	)
}