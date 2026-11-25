import { InfoCircledIcon } from '@radix-ui/react-icons';
import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Alert, cn } from '@/lib/utils';
import { MAX_IMAGE_SIZE, validateFileSize } from '../../../hooks/extensions';
import { useEditableEditor } from '../../../store/store';
import { blobUrlToBase64 } from '../../../utils';
import type { ElementDimensions } from '../hooks/use-drag-resize';
import { useDragResize } from '../hooks/use-drag-resize';
import { useImageActions } from '../hooks/use-image-actions';
import { ImageActions } from './dropdowns/actions';
import { ImageResize } from './resize-handle';

export interface ImageState {
	src: string;
	alt?: string;
	title?: string;
	isServerUploading: boolean;
	imageLoaded: boolean;
	isZoomed: boolean;
	error: boolean;
	size: ElementDimensions;
}

export interface ImageNodeProps {
	id: string;
	src: string;
	alt?: string;
	title?: string;
	width?: number | string;
	height?: number | string;
	fileName: string;
	textAlign?: 'left' | 'center' | 'right';
	margin?: string;
	float?: 'left' | 'right' | 'none';
	caption?: {
		text?: string;
		class?: string;
	};
	class?: string;
	figureClass: string;
}

export const ImageViewBlock = ({ node, editor, selected, updateAttributes }: NodeViewProps) => {
	const {
		id,
		src,
		alt,
		title,
		width,
		height,
		fileName,
		textAlign,
		margin,
		float,
		caption,
		class: className,
	} = node.attrs as ImageNodeProps;

	const disabled = useEditableEditor();

	const [error, setError] = useState<boolean>(false);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const caption_text = caption?.text || (title !== 'file' ? title : '');

	const is_float = float === 'left' || float === 'right';

	const { onCopy, onDownload, onRemoveImg } = useImageActions({
		node,
		editor,
		src,
	});

	const pathname = usePathname();

	const read_only = pathname === '/home';

	const attrWidth = useMemo(() => {
		const max_width = editor.view.dom.getBoundingClientRect().width - 320;

		if (typeof width === 'number') {
			return width;
		}

		if (typeof width === 'string') {
			if (width.includes('%')) {
				return max_width;
			}

			const parsed = Number.parseInt(width.replace(/[^\d.]/g, ''), 10);

			if (!Number.isNaN(parsed) && parsed > 0) return parsed;
		}

		return max_width;
	}, [width, editor]);

	const attrHeight = useMemo(() => {
		if (typeof height === 'number') return height;
		if (typeof height === 'string') {
			const parsed = Number.parseInt(height.replace(/[^0-9.]/g, ''), 10);
			if (!Number.isNaN(parsed) && parsed > 0) return parsed;
		}
		return attrWidth * 0.56;
	}, [height, attrWidth]);

	const { currentWidth, currentHeight, initiateResize, isResizing } = useDragResize({
		editor,
		initialWidth: attrWidth ?? 320,
		initialHeight: attrHeight ?? 640,
		onDimensionsChange: (dims) => {
			updateAttributes({
				width: Math.round(dims.width),
				height: Math.round(dims.height),
			});
		},
	});

	const shouldMerge = currentWidth <= 280;

	const handleImageError = useCallback(() => {
		setError(true);
	}, []);

	const handleUpload = useCallback(async () => {
		if (!src.startsWith('blob:')) return;

		setIsUploading(true);
		setError(false);

		try {
			const blob = await fetch(src).then((res) => res.blob());

			const file = new File([blob], fileName, { type: blob.type });

			if (!validateFileSize(file, MAX_IMAGE_SIZE, 'imagem')) return;

			const id = file.name.split('-')[0];
			const base64 = await blobUrlToBase64(src);

			updateAttributes({
				id,
				src: base64,
			});
		} catch (error) {
			setError(true);
			console.log(error);
			Alert('Erro', `Falha no upload da imagem: ${error}`, 'destructive');
		} finally {
			setIsUploading(false);
		}
	}, [src, updateAttributes, fileName]);

	useEffect(() => {
		handleUpload();
	}, [handleUpload]);

	return (
		<NodeViewWrapper
			draggable
			data-drag-handle
			className={cn(
				'node-image-container relative mb-4 flex',
				!is_float && 'clear-both w-full flex-col items-center justify-center',
				is_float && float === 'left' && 'float-left mr-6 w-fit',
				is_float && float === 'right' && 'float-right ml-6 w-fit',
				isResizing ? 'transition-none' : 'transition-all duration-300',
			)}
			style={{
				width: is_float ? `${currentWidth}px` : '100%',
			}}
		>
			{error ? (
				<div className='inline-grid w-fit place-items-center p-2'>
					<InfoCircledIcon className='text-destructive size-8' />
					<p className='mt-2 text-sm font-bold'>Falha ao carregar a imagem</p>
				</div>
			) : (
				<figure
					className={cn(
						'group/node-image relative inline-grid w-fit',
						className,
						read_only && 'max-w-fit',
					)}
					style={{
						width: currentWidth,
						margin,
						float,
					}}
				>
					<Image
						className={cn('mb-0! max-w-full', className, {
							'opacity-0': isUploading,
						})}
						id={id}
						src={encodeURI(src)}
						alt={alt ?? 'Imagem'}
						width={currentWidth}
						height={currentHeight}
						onError={handleImageError}
						unoptimized
					/>
					{isUploading ? (
						<div className='absolute inset-0 z-50 flex flex-col items-center justify-center'>
							<Spinner className='size-7' />
						</div>
					) : (
						<>
							{caption_text && (
								<figcaption
									className={cn(
										!disabled && 'outline-none',
										caption?.class,
										'text-base-content border-l-6 border-black bg-slate-400/20 p-6 text-sm',
									)}
									style={{ textAlign }}
									contentEditable={disabled}
									suppressContentEditableWarning
									onInput={(e) => {
										updateAttributes({
											caption: {
												...caption,
												text: e.currentTarget.textContent ?? '',
											},
										});
									}}
								>
									{caption_text}
								</figcaption>
							)}

							{disabled && selected && (
								<ImageResize
									editor={editor}
									isSelected={selected}
									isResizing={isResizing}
									onPointerDown={initiateResize}
								/>
							)}

							{disabled && !isUploading && !isResizing && (
								<ImageActions
									onCopy={onCopy}
									onDownload={onDownload}
									shouldMerge={shouldMerge}
									onRemoveImg={onRemoveImg}
								/>
							)}
						</>
					)}
				</figure>
			)}
		</NodeViewWrapper>
	);
};
