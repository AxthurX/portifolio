import {
	type ButtonHTMLAttributes,
	forwardRef,
	type HTMLAttributes,
	memo,
	type ReactNode,
} from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ActionButtonImageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	tooltip?: string;
}

export const ActionWrapper = memo(
	forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
		({ children, className, ...props }, ref) => (
			<div
				ref={ref}
				className={cn(
					'absolute top-3 flex rounded border-[0.5px] opacity-0 [backdrop-filter:saturate(1.8)_blur(20px)] group-hover/node-image:opacity-100',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		),
	),
);

export const ActionButtonImage = memo(
	forwardRef<HTMLButtonElement, ActionButtonImageProps>(
		({ icon, tooltip, className, ...props }, ref) => (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							ref={ref}
							variant='ghost'
							className={cn(
								'bg-base-200 relative z-50 flex size-7 gap-x-0.5 rounded-none p-0 hover:opacity-70',
								className,
							)}
							{...props}
						>
							{icon}
						</Button>
					</TooltipTrigger>
					{tooltip && <TooltipContent side='bottom'>{tooltip}</TooltipContent>}
				</Tooltip>
			</TooltipProvider>
		),
	),
);
