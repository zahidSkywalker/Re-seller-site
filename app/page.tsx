import Link from 'next/link'
import { CheckCircle2, Rocket, Shield, Star, TrendingUp } from 'lucide-react'
import Container from '@/components/Container'
import Button from '@/components/ui/Button'

export default function HomePage() {
	return (
		<>
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 -z-10 bg-gradient-radial from-brand/10 via-transparent to-transparent" />
				<Container>
					<div className="py-24 sm:py-32">
						<div className="mx-auto max-w-3xl text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Connect with publishers and grow your brand
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								A modern marketplace to buy and sell sponsored posts. Curated publishers, transparent pricing, and fast collaboration.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<Button asChild>
									<Link href="/dashboard">Get started</Link>
								</Button>
								<Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
									Learn more <span aria-hidden="true">→</span>
								</Link>
							</div>
						</div>
						<div className="mx-auto mt-16 max-w-5xl rounded-xl border bg-white/70 p-6 shadow-sm backdrop-blur">
							<div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
								<div>
									<p className="text-3xl font-bold">12k+</p>
									<p className="text-sm text-gray-600">Publishers</p>
								</div>
								<div>
									<p className="text-3xl font-bold">98%</p>
									<p className="text-sm text-gray-600">Satisfaction</p>
								</div>
								<div>
									<p className="text-3xl font-bold">24h</p>
									<p className="text-sm text-gray-600">Average turnaround</p>
								</div>
								<div>
									<p className="text-3xl font-bold">$2M+</p>
									<p className="text-sm text-gray-600">Processed</p>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			<section id="features" className="py-24 bg-gray-50">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need</h2>
						<p className="mt-2 text-gray-600">From discovery to delivery, manage end‑to‑end collaborations with confidence.</p>
					</div>
					<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<Feature icon={<TrendingUp className="h-6 w-6 text-brand" />} title="Discover">
							Find vetted publishers with detailed metrics, niches, and audiences.
						</Feature>
						<Feature icon={<Shield className="h-6 w-6 text-brand" />} title="Escrow Payments">
							Funds are held securely until your post is live. No surprises.
						</Feature>
						<Feature icon={<Rocket className="h-6 w-6 text-brand" />} title="Fast Turnaround">
							Streamlined messaging, briefs, and approvals ensure quick delivery.
						</Feature>
						<Feature icon={<CheckCircle2 className="h-6 w-6 text-brand" />} title="Quality Control">
							Automated checks help ensure brand safety and guidelines compliance.
						</Feature>
						<Feature icon={<Star className="h-6 w-6 text-brand" />} title="Reviews">
							Transparent ratings and feedback keep the marketplace trustworthy.
						</Feature>
						<Feature icon={<Rocket className="h-6 w-6 text-brand" />} title="Analytics">
							Measure performance and ROI across campaigns and publishers.
						</Feature>
					</div>
				</Container>
			</section>

			<PricingSection />
			<TestimonialsSection />
		</>
	)
}

function Feature({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
	return (
		<div className="rounded-xl border bg-white p-6 shadow-sm">
			<div className="flex items-center gap-3">
				{icon}
				<h3 className="text-lg font-semibold">{title}</h3>
			</div>
			<p className="mt-3 text-sm text-gray-600">{children}</p>
		</div>
	)
}

function PricingSection() {
	return (
		<section className="py-24">
			<Container>
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple pricing</h2>
					<p className="mt-2 text-gray-600">Start free. Upgrade when you are ready to scale.</p>
				</div>
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<PricingCard title="Starter" price="$0" features={["Browse listings", "Save favorites", "Message publishers"]} cta="Get started" />
					<PricingCard title="Pro" price="$29/mo" features={["Create listings", "Priority support", "Analytics"]} cta="Upgrade" highlighted />
					<PricingCard title="Business" price="$99/mo" features={["Team seats", "Advanced analytics", "API access"]} cta="Contact sales" />
				</div>
			</Container>
		</section>
	)
}

function PricingCard({ title, price, features, cta, highlighted }: { title: string; price: string; features: string[]; cta: string; highlighted?: boolean }) {
	return (
		<div className={`rounded-2xl border bg-white p-8 shadow-sm ${highlighted ? 'ring-2 ring-brand' : ''}`}>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="mt-4 text-4xl font-bold">{price}</p>
			<ul className="mt-6 space-y-3">
				{features.map((f) => (
					<li key={f} className="flex items-center gap-2 text-sm text-gray-600">
						<CheckCircle2 className="h-4 w-4 text-brand" />
						{f}
					</li>
				))}
			</ul>
			<div className="mt-8">
				<Button className="w-full">{cta}</Button>
			</div>
		</div>
	)
}

function TestimonialsSection() {
	return (
		<section className="bg-gray-50 py-24">
			<Container>
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Loved by brands and publishers</h2>
					<p className="mt-2 text-gray-600">Hear from teams growing with our marketplace.</p>
				</div>
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[1,2,3].map((i) => (
						<blockquote key={i} className="rounded-xl border bg-white p-6 shadow-sm">
							<p className="text-sm text-gray-700">“We scaled our content marketing with high-quality placements. Seamless experience!”</p>
							<footer className="mt-4 text-sm font-medium">Alex Johnson</footer>
						</blockquote>
					))}
				</div>
			</Container>
		</section>
	)
}