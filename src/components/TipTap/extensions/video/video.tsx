import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Alert, cn, formatFileName } from '@/lib/utils';
import { MAX_VIDEO_SIZE, validateFileSize } from '../../hooks/extensions';
import { useEditableEditor } from '../../store/store';
import { blobUrlToBase64, safeParse } from '../../utils';
import { ImageResize } from '../image/components/resize-handle';
import { useDragResize } from '../image/hooks/use-drag-resize';
import { isValidYoutubeUrl } from '../youtube/utils';

export interface VideoAttrs {
	id: string;
	src: string;
	name: string;
	type: string;
	width: number;
	height: number;
	float: string;
	margin: string;
	captions?: string;
	className: string;
	provider: 'file' | 'youtube';
}

export const VideoComponent = ({ node, updateAttributes, editor, selected }: NodeViewProps) => {
	const { src, name, width, height, margin, float, captions, className } = node.attrs as VideoAttrs;

	const disabled = useEditableEditor();

	const pathname = usePathname();

	const read_only = pathname === '/home';

	const attrWidth = safeParse(width);
	const attrHeight = safeParse(height);

	const { currentWidth, currentHeight, initiateResize, isResizing } = useDragResize({
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

	const handleUpload = useCallback(async () => {
		if (!src.startsWith('blob:')) return;

		try {
			const blob = await fetch(src).then((res) => res.blob());

			const file = new File([blob], name || 'video.mp4', {
				type: blob.type,
			});

			if (!validateFileSize(file, MAX_VIDEO_SIZE, 'vídeo')) return;

			const id = file.name.split('-')[0];
			const base64 = await blobUrlToBase64(src);

			updateAttributes({
				...node.attrs,
				id: id,
				src: formatFileName('temp_sector_name', file.name),
				url: base64,
			});
		} catch (error) {
			Alert('Erro', `Falha no upload do video: ${error}`, 'destructive');
			return;
		}
	}, [src, name, node.attrs, updateAttributes]);

	useEffect(() => {
		handleUpload();
	}, [handleUpload]);

	return (
		<NodeViewWrapper
			className={cn('relative flex flex-col', read_only && 'max-w-fit')}
			style={{ width: currentWidth, margin, float }}
		>
			{src && isValidYoutubeUrl(src) ? (
				<iframe
					src={src}
					width={currentWidth}
					height={currentHeight}
					allowFullScreen
					title='YouTube video'
				/>
			) : (
				<video className={className} width={currentWidth} height={currentHeight} controls>
					<source src={src} type='video/mp4' />
					<track src={captions} kind='captions' srcLang='pt' label='Português' default />
				</video>
			)}

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
