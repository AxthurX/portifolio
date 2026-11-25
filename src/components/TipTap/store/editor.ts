import type { Editor } from '@tiptap/core';
import { useCurrentEditor, useEditorState as useEditorStateTiptap } from '@tiptap/react';
import * as React from 'react';

export function useTiptapEditor(providedEditor?: Editor | null): {
	editor: Editor | null;
	editorState?: Editor['state'];
	canCommand?: Editor['can'];
} {
	const { editor: coreEditor } = useCurrentEditor();
	const mainEditor = React.useMemo(
		() => providedEditor || coreEditor,
		[providedEditor, coreEditor],
	);

	const editorState = useEditorStateTiptap({
		editor: mainEditor,
		selector(context) {
			if (!context.editor) {
				return {
					editor: null,
					editorState: undefined,
					canCommand: undefined,
				};
			}

			return {
				editor: context.editor,
				editorState: context.editor.state,
				canCommand: context.editor.can,
			};
		},
	});

	return editorState || { editor: null };
}

function useEditorInstance() {
	const editor = useTiptapEditor().editor;
	return editor as Editor;
}

function useEditorState() {
	const editorState = useTiptapEditor().editorState;
	return editorState;
}

function useCanCommand() {
	const canCommand = useTiptapEditor().canCommand;
	return canCommand;
}

export { useCanCommand, useEditorInstance, useEditorState };
