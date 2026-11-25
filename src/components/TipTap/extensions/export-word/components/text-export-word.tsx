import type { Editor } from '@tiptap/core';
import { ActionButton } from '../../../components/ActionButton';

export function RichTextExportWord({ editor }: { editor: Editor }) {
	if (!editor) return null;

	const onAction = () => {
		editor.commands.exportToWord();
	};

	return (
		<ActionButton
			action={onAction}
			icon='ExportWord'
			tooltip='Exportar para Word'
			className='cursor-pointer'
		/>
	);
}
