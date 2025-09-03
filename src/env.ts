import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		NEXTAUTH_SECRET: z.string().min(1),
		NEXTAUTH_URL: z.string().url().optional(),
		STRIPE_SECRET_KEY: z.string().min(1).optional(),
		STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
		STRIPE_PRICE_PREFIX: z.string().optional(),
	},
	client: {
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
	},
})