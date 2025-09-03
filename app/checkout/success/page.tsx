import Container from '@/components/Container'

export default function CheckoutSuccessPage() {
	return (
		<Container>
			<div className="py-24 text-center">
				<h1 className="text-3xl font-bold">Payment successful 🎉</h1>
				<p className="mt-2 text-gray-600">Your order has been recorded. The publisher will contact you shortly.</p>
			</div>
		</Container>
	)
}