import './globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Adsy-like Platform',
	description: 'Buy and sell sponsored posts with a modern marketplace',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}