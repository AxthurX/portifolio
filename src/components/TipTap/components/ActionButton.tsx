import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { icons } from '../icons';
import type { ActionButtonProps } from '../interfaces/types';
import { getShortcutKeys } from '../utils/platform';

const ActionButton = React.forwardRef<HTMLButtonElement, Partial<ActionButtonProps>>(
	(props, ref) => {
		const {
			icon = undefined,
			// title = undefined,
			tooltip = undefined,
			disabled = false,
			className = '',
			// color = undefined,
			loading = undefined,
			shortcutKeys = undefined,
			tooltipOptions = {},
			action = undefined,
			isActive = undefined,
			children,
			asChild = false,
			upload = false,
			initialDisplayedColor = undefined,
			dataState = false,
			...rest
		} = props;

		type IconName = keyof typeof icons;
		const Icon = icons[icon as IconName];
		const Comp = asChild ? Slot : Toggle;

		const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			if (disabled) {
				e.preventDefault();
				return;
			}
			action?.(e);
		};

		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Comp
							size='sm'
							ref={ref}
							onClick={onClickHandler}
							disabled={disabled}
							data-state={isActive?.() ? 'on' : 'off'}
							className={cn('hover:bg-sage-400/80 size-9', className)}
							{...(rest as Omit<typeof rest, 'loading'>)}
						>
							{Icon && <Icon className='size-4' />}
							{children}
						</Comp>
					</TooltipTrigger>

					{tooltip && (
						<TooltipContent {...tooltipOptions}>
							<div className='flex max-w-24 flex-col items-center text-center'>
								<div>{tooltip}</div>
								{shortcutKeys?.length && <span>{getShortcutKeys(shortcutKeys)}</span>}
							</div>
						</TooltipContent>
					)}
				</Tooltip>
			</TooltipProvider>
		);
	},
);

export { ActionButton };
