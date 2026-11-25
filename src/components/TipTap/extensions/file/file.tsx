/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */

'use client';

import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { NewFile } from '../../components/Image/image-create';
import { useEditableEditor } from '../../store/store';
import { safeParse } from '../../utils';
import { ImageResize } from '../image/components/resize-handle';
import { useDragResize } from '../image/hooks/use-drag-resize';

interface FileAttrs {
	files: NewFile[];
	type: 'group' | 'accordion' | 'simple' | string;
	class: string;
	width: number;
	height: number;
	title: string;
}

export const FileComponent = ({ editor, node, selected, updateAttributes }: NodeViewProps) => {
	const { files, type, class: className, width, height, title } = node.attrs as FileAttrs;

	const titleRef = useRef<HTMLSpanElement>(null);

	const attrWidth = safeParse(width);
	const attrHeight = safeParse(height);

	const disabled = useEditableEditor();

	const pathname = usePathname();

	const read_only = pathname === '/home';

	const { currentWidth, initiateResize, isResizing } = useDragResize({
		editor,
		initialWidth: attrWidth ?? width,
		initialHeight: attrHeight ?? height,
		onDimensionsChange: (dims) => {
			updateAttributes({
				width: Math.round(dims.width),
				height: Math.round(dims.height),
			});
		},
	});

	useEffect(() => {
		if (!titleRef.current) return;

		if (titleRef.current.textContent !== title) {
			titleRef.current.textContent = title;
		}
	}, [title]);

	const commitTitle = () => {
		if (!titleRef.current) return;

		const value = titleRef.current.textContent ?? '';

		if (value !== title) {
			updateAttributes({ title: value });
		}
	};

	const getFileUrl = (item: NewFile): string | undefined =>
		item.href?.includes('temp_sector_name') ? item.url : item.href;

	return (
		<NodeViewWrapper
			style={{ width: currentWidth }}
			className={cn('relative flex flex-col', className, read_only && 'max-w-fit')}
		>
			<details open className='border-beige-900/70 border-2'>
				<summary
					ref={titleRef}
					contentEditable={disabled}
					suppressContentEditableWarning
					onBlur={commitTitle}
					className='bg-beige-500 px-2 py-4 text-left text-sm font-medium text-slate-100 hover:cursor-pointer'
				/>

				<div className='m-2 flex flex-wrap gap-2 overflow-hidden px-2 text-sm'>
					{files.map((item) => (
						<a
							target='_blank'
							rel='noopener noreferrer'
							key={`${item.id}`}
							title={item.alt_name}
							href={getFileUrl(item)}
							className={cn(
								'max-w-screen-sm text-ellipsis whitespace-nowrap hover:cursor-pointer',
								{
									'bg-beige-600 flex flex-wrap rounded-sm p-2 wrap-break-word text-white':
										type === 'group',
									'flex flex-wrap text-blue-600': type === 'accordion',
								},
							)}
						>
							{item.alt_name}
						</a>
					))}
				</div>
			</details>

			{disabled && selected && (
				<ImageResize
					editor={editor}
					isSelected={selected}
					isResizing={isResizing}
					onPointerDown={initiateResize}
				/>
			)}
		</NodeViewWrapper>
	);
};
