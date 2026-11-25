'use client';

import type { ElementType } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { handleSettings } from '../../util';
import type { Key } from '../items';

type CardToggleProps = {
	type: Key;
	options: string[];
	value: string;
	onChange: (value: string) => void;
	labels: string[];
	icons: ElementType[];
	disabled?: boolean;
};

export function CardToggle({
	options,
	value,
	type,
	onChange,
	labels,
	icons,
	disabled,
}: CardToggleProps) {
	const step = options.indexOf(value);
	const is_toggle_only = options.length === 2;
	const Icon = (icons[step] || icons[0]) as ElementType;

	const handleClick = async () => {
		const next_value = options[(options.indexOf(value) + 1) % options.length];
		onChange(next_value);
		handleSettings(type, next_value);
	};

	return (
		<Card
			className={cn(
				'border-accent from-base-200 to-base-300/90 hover:border-primary/40 hover:shadow-primary/60 relative flex h-24 w-full cursor-pointer flex-col items-center justify-center border bg-linear-to-b px-3 py-2 leading-normal! shadow-md/5 transition-all duration-150 ease-out select-none hover:border-2 hover:opacity-75 hover:shadow-sm',
				step > 0 &&
					'border-primary/60 text-primary/60 shadow-primary/60 border-4! shadow-sm transition-colors',
				disabled &&
					'hover:border-accent cursor-not-allowed opacity-50 shadow-sm hover:border hover:opacity-50 hover:shadow-md hover:shadow-black/10',
			)}
			onClick={disabled ? undefined : handleClick}
			aria-pressed={value !== options[0]}
			aria-label={labels[step] || value}
		>
			<CardContent className='text-base-content flex w-full flex-col items-center justify-center space-y-1 p-0'>
				<Icon className='size-8' />
				<span className='text-center! text-[13px] leading-4! font-semibold'>
					{labels[step] || value}
				</span>
				{disabled && (
					<span className='text-base-content/70 bottom-2 -mt-1.5 text-center text-[11px] leading-2.5 italic'>
						Indisponível nesta página
					</span>
				)}

				{!is_toggle_only && step > 0 && (
					<div className='flex w-4/5 gap-1'>
						{options.slice(1).map((item, index) => (
							<div
								key={item}
								className={`h-1 flex-1 rounded-full transition-colors ${
									index < step ? 'bg-primary/80' : 'bg-primary-content'
								}`}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
