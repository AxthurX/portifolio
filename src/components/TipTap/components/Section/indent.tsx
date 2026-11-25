import type { Editor } from '@tiptap/react';
import { Indent, Outdent } from 'lucide-react';
import type { FormatAction } from '../../interfaces/types';
import { ToolbarActions } from '../toolbar-actions';

const actions: FormatAction[] = [
	{
		value: 'indent',
		label: 'Indentar',
		icon: <Indent className='size-6' />,
		shortcuts: ['Tab'],
		action: (editor) => editor.chain().focus().indent().run(),
		canExecute: () => true,
		isActive: () => false,
	},
	{
		value: 'outdent',
		label: 'Desindentar',
		icon: <Outdent className='size-6' />,
		shortcuts: ['Shift', 'Tab'],
		action: (editor) => editor.chain().focus().outdent().run(),
		canExecute: () => true,
		isActive: () => false,
	},
];

export const SectionIndent = ({ editor }: { editor: Editor }) => {
	return <ToolbarActions editor={editor} actions={actions} />;
};

export default SectionIndent;
