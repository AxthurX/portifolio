import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLProps } from 'react';
import { cn } from '@/lib/utils';

const separatorVariants = cva(
	'border-accent/50 bg-base-100 sedam:bg-white/75 mt-2 mb-4 h-3 border-x-0 border-y dark:border-white dark:border-b-transparent dark:bg-black',
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
