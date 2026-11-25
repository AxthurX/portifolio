import type { TooltipContentProps } from '@radix-ui/react-tooltip';
import * as React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
	isActive?: boolean;
	label?: string;
	shortcut?: string;
	tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
	({ isActive = false, children, label, shortcut, className, tooltipOptions, ...props }, ref) => {
		const ToggleButton: React.ReactElement = (
			<Toggle
				ref={ref}
				size='sm'
				aria-pressed={isActive}
				className={cn(
					'hover:bg-sage-400/70 focus-visible:ring-ring size-8 cursor-pointer border-none p-0 outline-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2',
					isActive && 'bg-accent',
					className,
				)}
				{...props}
			>
				{children}
			</Toggle>
		);

		return (
			<Tooltip>
				<TooltipTrigger asChild>{ToggleButton}</TooltipTrigger>

				{label && (
					<TooltipContent side='top' {...tooltipOptions}>
						<div className='flex items-baseline gap-2 text-sm'>
							<span>{label}</span>
							{shortcut && (
								<kbd className='rounded bg-gray-300/20 px-1.5 py-0.5 text-xs shadow'>
									{shortcut}
								</kbd>
							)}
						</div>
					</TooltipContent>
				)}
			</Tooltip>
		);
	},
);

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
