import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLProps } from 'react';
import { cn } from '@/lib/utils';

const sectionVariants = cva('mx-1 mb-2 grid grid-cols-12 gap-3 px-2 md:grid-cols-24 md:gap-2', {
	variants: {
		variant: {
			left: 'xl:pr-1 xl:pl-2',
			right: 'xl:pr-2 xl:pl-1',
			center: 'xl:px-2',
			array: 'max-lg:border-sage-200 mx-0 grow grid-cols-1 gap-2 px-0 max-lg:border max-lg:p-2',
		},
	},
	defaultVariants: { variant: 'center' },
});

const Section = forwardRef<
	HTMLElement,
	HTMLProps<HTMLElement> & VariantProps<typeof sectionVariants>
>(({ className, variant, ...props }, ref) => {
	Section.displayName;

	return <section ref={ref} className={cn(sectionVariants({ variant }), className)} {...props} />;
});

export default Section;
