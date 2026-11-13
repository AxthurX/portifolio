import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'rounded-base font-base inline-flex items-center justify-center text-sm whitespace-nowrap text-black ring-offset-white transition-all hover:cursor-pointer focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-light hover:bg-primary/90 active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark border-2 border-black active:shadow-none dark:border-white',
				secondary:
					'bg-secondary text-secondary-foreground shadow-light hover:bg-secondary/80 active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark border-2 border-black active:shadow-none dark:border-white',
				destructive:
					'bg-destructive text-destructive-foreground shadow-light hover:bg-destructive/90 active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark border-2 border-black active:shadow-none dark:border-white',
				outline:
					'border-input bg-background shadow-light hover:bg-background/90 hover:text-foreground active:translate-x-boxShadowX active:translate-y-boxShadowY dark:text-base-content dark:shadow-dark border border-2 border-black active:shadow-none dark:border-white',
				link: 'border-input bg-background shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:bg-background/90 hover:text-foreground dark:shadow-dark border border-2 border-black hover:shadow-none dark:border-white',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				noShadow: 'bg-main border-2 border-black',
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
	extends React.ComponentProps<'button'>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
