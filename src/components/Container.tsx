import type { ReactNode } from 'react'
import clsx from 'clsx'

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
	return <div className={clsx('container', className)}>{children}</div>
}