import { forwardRef } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, children, asChild, ...props },
	ref,
) {
	const classes = clsx('btn-primary', className)
	if (asChild) {
		return (
			<Link href="#" className={classes}>
				{children}
			</Link>
		)
	}
	return (
		<button ref={ref} className={classes} {...props}>
			{children}
		</button>
	)
})

export default Button