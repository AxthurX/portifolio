import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Legend({
	className,
	ref,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>) {
	return (
		<legend
			ref={ref}
			className={cn(
				'mb-6 flex min-h-12 w-full items-center justify-center border-accent/50 border-x-0 border-y bg-base-100 sedam:bg-white/75 text-center font-semibold text-lg dark:border-white dark:bg-black dark:text-white',
				className,
			)}
			{...props}
		/>
	);
}
