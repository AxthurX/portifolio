import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-base font-base text-black text-sm ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border-2 border-black bg-primary text-slate-50 shadow-light hover:bg-calpolygreen-800/90 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
				secondary:
					'border-2 border-black bg-secondary text-secondary-foreground shadow-light hover:bg-secondary/80 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
				destructive:
					'border-2 border-black bg-destructive text-destructive-foreground shadow-light hover:bg-destructive/90 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				noShadow: 'border-2 border-black bg-main',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
