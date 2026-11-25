import type { Editor } from '@tiptap/core';
import { ActionButton } from '../../../components/ActionButton';

export function RichTextExportPdf({ editor }: { editor: Editor }) {
	if (!editor) return null;

	const onAction = () => {
		editor.commands.exportToPdf();
	};

	return (
		<ActionButton
			action={onAction}
			icon='ExportPdf'
			tooltip='Exportar para PDF'
			className='cursor-pointer'
		/>
	);
}
