import { forwardRef, type HTMLProps } from 'react';
import { cn } from '@/lib/utils';

const Header = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		Header.displayName;

		return (
			<div
				ref={ref}
				className={cn(
					'not-dark:border-y-base-100 flex min-h-[400px] flex-col items-center justify-center border-y dark:border-b-transparent',
					className,
				)}
				{...props}
			/>
		);
	},
);

const HeaderTitle = forwardRef<HTMLHeadingElement, HTMLProps<HTMLHeadingElement>>(
	({ className, ...props }, ref) => {
		HeaderTitle.displayName;

		return (
			<span
				ref={ref}
				className={cn(
					'my-12 text-center text-4xl font-bold tracking-tighter md:px-4 md:text-7xl dark:bg-black',
					className,
				)}
				{...props}
			/>
		);
	},
);

const HeaderBody = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		HeaderBody.displayName;
		return (
			<div ref={ref} className={cn('mx-4 mb-8 lg:mx-40 dark:border-none', className)} {...props} />
		);
	},
);

const HeaderGroup = Object.assign(Header, {
	Title: HeaderTitle,
	Body: HeaderBody,
});

export { HeaderGroup as Header };
