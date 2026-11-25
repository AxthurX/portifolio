import { cn } from '@/lib/utils';

export function DropletIcon({
	color,
	className,
}: {
	color: string;
	className?: string;
}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			strokeWidth='2'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={cn(className, 'ml-1 size-6')}
		>
			<title>Droplet</title>
			<path
				d='M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'
				fill={color}
			/>
		</svg>
	);
}
