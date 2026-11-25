import { type Editor, useEditorState } from '@tiptap/react';
import type { FormatAction } from '../interfaces/types';
import { getShortcutKeys } from '../utils/platform';
import { ToolbarButton } from './toolbar-button';

interface ToolbarActionsProps {
	editor: Editor;
	actions: FormatAction[];
	size?: 'default' | 'sm' | 'lg' | null;
	variant?: 'default' | 'outline' | null;
	className?: string;
}

export const ToolbarActions = ({
	editor,
	actions,
	size,
	variant,
	className,
}: ToolbarActionsProps) => {
	const editor_state = useEditorState({
		editor,
		selector: ({ editor }) => ({
			selection: editor.state.selection,
			doc: editor.state.doc,
			isEditable: editor.isEditable,
		}),
	});

	if (!editor_state) return null;

	return actions
		.filter((action) => action.label)
		.map((action) => {
			const isActive = action.isActive ? action.isActive(editor) : false;
			const canExecute = action.canExecute ? action.canExecute(editor) : true;

			return (
				<ToolbarButton
					key={action.label}
					size={size}
					variant={variant}
					className={className}
					onClick={() => action.action(editor)}
					disabled={!canExecute}
					isActive={isActive}
					label={action.label}
					shortcut={getShortcutKeys(action.shortcuts)}
				>
					{action.icon}
				</ToolbarButton>
			);
		});
};
