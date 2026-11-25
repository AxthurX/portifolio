import { CaretDownIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import type * as React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { FormatAction } from '../interfaces/types';
import { ShortcutKey } from './shortcut-key';
import { ToolbarButton } from './toolbar-button';

interface ToolbarDropdownProps {
	editor: Editor;
	size?: 'default' | 'sm' | 'lg' | null;
	variant?: 'default' | 'outline' | null;
	actions: FormatAction[];
	tooltip?: string;
	className?: string;
	icon?: React.ReactNode;
}

export const ToolbarDropdown = ({
	editor,
	actions,
	tooltip = 'Mais opções',
	className = 'w-12',
	icon,
	size,
	variant,
}: ToolbarDropdownProps) => {
	const dropdown_active = actions.some((action) => action.isActive(editor));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton
					size={size}
					variant={variant}
					label={tooltip}
					isActive={dropdown_active}
					className={cn(className)}
				>
					{icon || <CaretDownIcon className='size-5' />}
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='flex w-full flex-wrap'>
				{actions.map((action) => (
					<DropdownMenuItem
						key={action.label}
						onClick={() => action.action(editor)}
						disabled={!action.canExecute(editor)}
						className={cn('flex flex-row items-center justify-between gap-4', {
							'bg-accent': action.isActive(editor),
						})}
						aria-label={action.label}
					>
						<span className='grow'>{action.icon ? action.icon : action.label}</span>
						{action.shortcuts && <ShortcutKey keys={action.shortcuts} />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
