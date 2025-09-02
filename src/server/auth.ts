import { prisma } from '@/lib/prisma'
import Credentials from 'next-auth/providers/credentials'
import type { AuthOptions } from 'next-auth'
import { compare } from 'bcryptjs'
import { z } from 'zod'

export const authConfig: AuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
				const parsed = schema.safeParse(credentials)
				if (!parsed.success) return null
				const { email, password } = parsed.data
				const user = await prisma.user.findUnique({ where: { email } })
				if (!user) return null
				const valid = await compare(password, user.password)
				if (!valid) return null
				return { id: user.id, email: user.email, name: user.name ?? undefined }
			},
		}),
	],
	pages: {
		signIn: '/signin',
	},
	session: { strategy: 'jwt' },
	callbacks: {
		async jwt({ token }) {
			return token
		},
		async session({ session, token }) {
			if (token?.sub && session.user) {
				session.user.id = token.sub
			}
			return session
		},
	},
}