export function HighlightIcon({ color }: { color: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='#000'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='mr-1 size-5'
		>
			<title>Highlight Ícone</title>
			<path
				d='M9 11L3 17v3h9l3-3'
				fill={color}
				stroke='black'
				strokeWidth='2'
			/>
			<path d='m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4' />
		</svg>
	);
}
