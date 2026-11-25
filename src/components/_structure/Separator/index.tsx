import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { type HTMLProps, forwardRef } from 'react';

const separatorVariants = cva(
	'mt-2 mb-4 h-3 border-accent/50 border-x-0 border-y bg-base-100 sedam:bg-white/75 dark:border-white dark:border-b-transparent dark:bg-black',
	{
		variants: {
			sizing: {
				xs: 'h-2',
				sm: 'h-3',
			},
		},
		defaultVariants: {
			sizing: 'sm',
		},
	},
);

const Separator = forwardRef<
	HTMLDivElement,
	HTMLProps<HTMLDivElement> & VariantProps<typeof separatorVariants>
>(({ className, sizing, ...props }, ref) => {
	Separator.displayName;

	return <div ref={ref} className={cn(separatorVariants({ sizing }), className)} {...props} />;
});

export default Separator;
