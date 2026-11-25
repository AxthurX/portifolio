'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, orientation = 'horizontal', ...props }, ref) => {
	const vertical = orientation === 'vertical';

	return (
		<SliderPrimitive.Root
			ref={ref}
			orientation={orientation}
			className={cn(
				'relative flex touch-none select-none',
				vertical ? 'h-32 w-5 flex-col' : 'w-full items-center',
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				className={cn(
					'bg-secondary relative grow overflow-hidden rounded-full',
					vertical ? 'h-full w-2' : 'h-2 w-full',
				)}
			>
				<SliderPrimitive.Range
					className={cn('bg-primary absolute', vertical ? 'w-full' : 'h-full')}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className='border-primary bg-background ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50' />
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
