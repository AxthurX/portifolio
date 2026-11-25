import { type Editor, Extension } from '@tiptap/core';
import { ActionButton } from '../../../components/ActionButton';

export const ColumnActionButton = Extension.create({
	name: 'columnActionButton',

	addOptions() {
		return {
			...this.parent?.(),
			button: ({ editor }: { editor: Editor }) => ({
				component: ActionButton,
				componentProps: {
					icon: 'Columns',
					tooltip: 'Modificar',
					action: () => editor.chain().focus().insertColumns({ cols: 2 }).run(),
				},
			}),
		};
	},
});
