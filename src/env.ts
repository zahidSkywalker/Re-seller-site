import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().min(1),
		NEXTAUTH_SECRET: z.string().min(1),
		NEXTAUTH_URL: z.string().url().optional(),
	},
	client: {},
	experimental__runtimeEnv: {},
})