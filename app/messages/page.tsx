"use client"
import { useEffect, useState } from 'react'
import Container from '@/components/Container'

export default function MessagesPage() {
	const [otherUserId, setOtherUserId] = useState('')
	const [messages, setMessages] = useState<any[]>([])
	const [content, setContent] = useState('')

	async function load() {
		if (!otherUserId) return
		const res = await fetch(`/api/messages?userId=${otherUserId}`, { cache: 'no-store' })
		const data = await res.json()
		setMessages(data.messages)
	}
	useEffect(() => { load() }, [otherUserId])

	async function send() {
		if (!content) return
		await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: otherUserId, content }) })
		setContent('')
		await load()
	}

	return (
		<Container>
			<div className="mx-auto max-w-2xl py-12">
				<h1 className="text-2xl font-semibold">Messages</h1>
				<input className="mt-4 w-full rounded-md border px-3 py-2" placeholder="Other User ID" value={otherUserId} onChange={(e) => setOtherUserId(e.target.value)} />
				<div className="mt-6 space-y-2 rounded-lg border p-4">
					{messages.map((m) => (
						<div key={m.id} className="text-sm">
							{m.content}
						</div>
					))}
				</div>
				<div className="mt-4 flex gap-2">
					<input className="flex-1 rounded-md border px-3 py-2" placeholder="Type a message" value={content} onChange={(e) => setContent(e.target.value)} />
					<button className="btn-primary" onClick={send}>Send</button>
				</div>
			</div>
		</Container>
	)
}