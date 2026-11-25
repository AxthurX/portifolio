import type { Editor } from '@tiptap/core';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ImageResizeProps extends HTMLAttributes<HTMLDivElement> {
	editor: Editor;
	className?: string;
	isResizing?: boolean;
	isSelected?: boolean;
}

const RESIZE_HANDLES = [
	{ dir: 'tl', className: 'top-[-7px] left-[-7px] cursor-nw-resize' },
	{ dir: 'tr', className: 'top-[-7px] right-[-7px] cursor-ne-resize' },
	{ dir: 'bl', className: 'bottom-[-7px] left-[-7px] cursor-sw-resize' },
	{ dir: 'br', className: 'bottom-[-7px] right-[-7px] cursor-se-resize' },
];

export const ImageResize = ({
	editor,
	className,
	isSelected,
	isResizing = false,
	...props
}: ImageResizeProps) => {
	return (
		<div
			className={cn(
				'border-accent pointer-events-none absolute inset-0 border-4 transition',
				{
					'opacity-100': isSelected,
					'opacity-80': isResizing,
					hidden: !isSelected,
				},
				className,
			)}
		>
			{RESIZE_HANDLES.map((handle) => (
				<span
					key={handle.dir}
					data-direction={handle.dir}
					{...props}
					className={cn(
						'bg-primary pointer-events-auto absolute block size-3 rounded-sm border border-white',
						handle.className,
					)}
				/>
			))}
		</div>
	);
};
