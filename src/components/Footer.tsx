import Container from './Container'

export default function Footer() {
	return (
		<footer className="border-t bg-white">
			<Container className="flex h-16 items-center justify-between text-sm text-gray-600">
				<p>© {new Date().getFullYear()} Adsy-like. All rights reserved.</p>
				<div className="flex items-center gap-4">
					<a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a>
					<a href="https://render.com" target="_blank" rel="noreferrer">Render</a>
				</div>
			</Container>
		</footer>
	)
}