import { forwardRef, type HTMLProps } from 'react';
import { cn } from '@/lib/utils';

const Fieldset = forwardRef<HTMLFieldSetElement, HTMLProps<HTMLFieldSetElement>>(
	({ className, ...props }, ref) => {
		Fieldset.displayName;

		return <fieldset ref={ref} className={cn('flex flex-col', className)} {...props} />;
	},
);

export default Fieldset;
