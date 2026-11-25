import React from 'react';
import { cn } from '@/lib/utils';
import { getShortcutKey } from '../utils';

export interface ShortcutKeyProps extends React.HTMLAttributes<HTMLSpanElement> {
	keys: string[];
}

export const ShortcutKey = React.forwardRef<HTMLSpanElement, ShortcutKeyProps>(
	({ className, keys, ...props }, ref) => {
		const modified_keys = keys.map((key) => getShortcutKey(key));

		return (
			<span {...props} ref={ref} className={cn('inline-flex items-center gap-0.5', className)}>
				{modified_keys.map((shortcut) => (
					<kbd
						key={shortcut.symbol}
						className={cn(
							'inline-block min-w-2.5 text-center align-baseline font-sans text-xs font-medium text-[rgb(156,157,160)] capitalize',

							className,
						)}
						{...props}
						ref={ref}
					>
						{shortcut.symbol}
					</kbd>
				))}
			</span>
		);
	},
);

ShortcutKey.displayName = 'ShortcutKey';
