import Container from '@/components/Container'

export default function CheckoutCancelPage() {
	return (
		<Container>
			<div className="py-24 text-center">
				<h1 className="text-3xl font-bold">Payment canceled</h1>
				<p className="mt-2 text-gray-600">You have canceled the payment. You can try again anytime.</p>
			</div>
		</Container>
	)
}