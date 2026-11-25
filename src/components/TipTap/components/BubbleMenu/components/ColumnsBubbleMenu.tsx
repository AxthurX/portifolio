import type { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';
import { useCallback } from 'react';
import { MultiColumn } from '../../../extensions/multi-column';
import { deleteNode } from '../../../utils/delete-node';
import { ActionButton } from '../../ActionButton';

export function ColumnsBubbleMenu({ editor }: { editor: Editor }) {
	const shouldShow = useCallback(() => editor.isActive(MultiColumn.name), [editor]);

	const deleteMe = useCallback(() => deleteNode(MultiColumn.name, editor), [editor]);

	const addColBefore = useCallback(() => editor.chain().focus().addColBefore().run(), [editor]);

	const addColAfter = useCallback(() => editor.chain().focus().addColAfter().run(), [editor]);

	const deleteCol = useCallback(() => editor.chain().focus().deleteCol().run(), [editor]);

	return (
		<BubbleMenu
			editor={editor}
			pluginKey='columns-bubble-menu'
			shouldShow={shouldShow}
			options={{
				flip: false,
				placement: 'bottom-start',
				offset: {
					mainAxis: -2,
					crossAxis: 16,
				},
			}}
		>
			<div className='border-beige-200/80 pointer-events-auto w-auto rounded-lg border bg-white px-3 py-2 shadow-sm transition-all select-none'>
				<ActionButton action={addColBefore} icon='ColumnAddLeft' tooltip='Inserir coluna antes' />

				<ActionButton action={addColAfter} icon='ColumnAddRight' tooltip='Inserir coluna depois' />

				<ActionButton action={deleteCol} icon='DeleteColumn' tooltip='Apagar está coluna' />

				<ActionButton action={deleteMe} icon='Trash2' tooltip='Apagar colunas' />
			</div>
		</BubbleMenu>
	);
}
