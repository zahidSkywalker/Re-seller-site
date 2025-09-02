import Link from 'next/link'
import Container from './Container'

export default function Navbar() {
	return (
		<header className="border-b bg-white/70 backdrop-blur">
			<Container className="flex h-16 items-center justify-between">
				<Link href="/" className="text-lg font-semibold">Adsy-like</Link>
				<nav className="hidden gap-6 text-sm text-gray-700 sm:flex">
					<Link href="#features">Features</Link>
					<Link href="#pricing">Pricing</Link>
					<Link href="/dashboard">Dashboard</Link>
				</nav>
				<div className="flex items-center gap-3">
					<Link href="/signin" className="text-sm font-medium">Sign in</Link>
					<Link href="/signin" className="btn-primary text-sm">Sign up</Link>
				</div>
			</Container>
		</header>
	)
}