import type { Editor } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import { useCallback } from 'react';

interface UseImageActionsProps {
	editor: Editor;
	node: Node;
	src: string;
}

export type ImageActionHandlers = {
	onCopy?: () => void;
	onDownload?: () => void;
	onRemoveImg?: () => void;
};

export const useImageActions = ({ node, editor }: UseImageActionsProps) => {
	const onDownload = useCallback(() => {
		editor.commands.downloadImage({ src: node.attrs.src, alt: node.attrs.alt });
	}, [editor.commands, node.attrs.alt, node.attrs.src]);

	const onCopy = useCallback(() => {
		editor.commands.copyImage({ src: node.attrs.src });
	}, [editor.commands, node.attrs.src]);

	const onRemoveImg = useCallback(() => {
		editor.commands.command(({ tr, dispatch }) => {
			const { selection } = tr;
			const nodeAtSelection = tr.doc.nodeAt(selection.from);

			if (nodeAtSelection && nodeAtSelection.type.name === 'image') {
				if (dispatch) {
					tr.deleteSelection();
					return true;
				}
			}
			return false;
		});
	}, [editor.commands]);

	return {
		onDownload,
		onCopy,
		onRemoveImg,
	};
};
