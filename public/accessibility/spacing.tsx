import type { SVGProps } from 'react';

export function IconTextSpacing(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			{...props}
		>
			<title>Text spacing</title>
			<path d='M7 8h10' />
			<path d='M7 12h10' />
			<path d='M7 16h10' />
			<path d='M3 4v16' />
			<path d='M21 4v16' />
		</svg>
	);
}
