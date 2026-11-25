import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function MainContainer({
	className,
	ref,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div
			ref={ref}
			className={cn(
				'reading-mode border-accent bg-base-100 container grow divide-y p-0 max-sm:border-0 xl:border xl:border-t-0 dark:border-white dark:bg-black',
				className,
			)}
			{...props}
		/>
	);
}

export default MainContainer;
