import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { useEditableEditor } from '../../store/store';
import { safeParse } from '../../utils';
import { ImageResize } from '../image/components/resize-handle';
import { useDragResize } from '../image/hooks/use-drag-resize';

export interface YoutubeAttrs {
	id: string;
	src: string;
	name: string;
	type: string;
	width: number;
	height: number;
	float: string;
	margin: string;
	captions?: string;
	provider: 'file' | 'youtube';
}

export const YoutubeComponent = ({ node, updateAttributes, editor, selected }: NodeViewProps) => {
	const { src, width, height, margin, float } = node.attrs as YoutubeAttrs;

	const attrWidth = safeParse(width) ?? width;
	const attrHeight = safeParse(height) ?? height;

	const disabled = useEditableEditor();

	const { currentWidth, currentHeight, initiateResize, isResizing } = useDragResize({
		editor,
		initialWidth: attrWidth,
		initialHeight: attrHeight,
		onDimensionsChange: (dims) => {
			updateAttributes({
				width: Math.round(dims.width),
				height: Math.round(dims.height),
			});
		},
	});

	return (
		<NodeViewWrapper className='relative flex flex-col' style={{ width: currentWidth }}>
			<iframe
				src={src}
				title='Youtube video'
				width={currentWidth}
				height={currentHeight}
				style={{ margin, float: float as any }}
				allowFullScreen
			/>

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
