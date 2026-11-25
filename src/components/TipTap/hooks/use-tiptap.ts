import type { Editor } from '@tiptap/core';
import type { UseEditorOptions } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import { useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { setEditableEditor } from '../store/store';
import { EXTENSIONS } from './extensions';

export interface TiptapEditorProps extends UseEditorOptions {
	defaultValue?: string;
	className?: string;
	onChange?: (content: string) => void;
	onEditorReady?: (editor: Editor) => void;
}

export const useTiptapEditor = ({
	defaultValue,
	className,
	onChange,
	onEditorReady,
	editable = true,
	...props
}: TiptapEditorProps) => {
	const handleChange = useCallback(
		({ editor }: { editor: Editor }) => {
			if (onChange) onChange(editor.getHTML());
		},
		[onChange],
	);

	const editor = useEditor({
		editable,
		content: defaultValue,
		extensions: EXTENSIONS,
		immediatelyRender: false,
		shouldRerenderOnTransaction: false,
		editorProps: {
			attributes: {
				class: cn(
					'h-full w-full max-w-none rounded-b-md p-4 outline-none focus:outline-none',
					className,
				),
			},
		},
		onUpdate: handleChange,
		...props,
	});

	useEffect(() => {
		if (!editor) return;

		if (editor.isEditable !== editable) editor.setEditable(editable);

		setEditableEditor(editable);
	}, [editor, editable]);

	useEffect(() => {
		if (!editor || !defaultValue) return;

		if (editor.isEmpty) {
			queueMicrotask(() => {
				if (editor && !editor.isDestroyed && editor.isEmpty) {
					editor.commands.setContent(defaultValue || '');
				}
			});
		}
	}, [editor, defaultValue]);

	useEffect(() => {
		if (editor && onEditorReady) onEditorReady(editor);
	}, [editor, onEditorReady]);

	return editor;
};

export default useTiptapEditor;
