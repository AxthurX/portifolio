import { DividerHorizontalIcon, QuoteIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/core';
import type { FormatAction } from '../../interfaces/types';
import { ToolbarActions } from '../toolbar-actions';

type InsertElementAction = 'blockquote' | 'horizontalRule';

interface InsertElement extends FormatAction {
	value: InsertElementAction;
}

const format_actions: InsertElement[] = [
	{
		value: 'blockquote',
		label: 'Bloco de citação',
		icon: <QuoteIcon className='size-5' />,
		action: (editor) => editor.chain().focus().toggleBlockquote().run(),
		isActive: (editor) => editor.isActive('blockquote'),
		canExecute: (editor) =>
			editor.can().chain().focus().toggleBlockquote().run(),
		shortcuts: ['mod', 'shift', 'B'],
	},
	{
		value: 'horizontalRule',
		label: 'Linha horizontal',
		icon: <DividerHorizontalIcon className='size-5' />,
		action: (editor) => editor.chain().focus().setHorizontalRule().run(),
		isActive: () => false,
		canExecute: (editor) =>
			editor.can().chain().focus().setHorizontalRule().run(),
		shortcuts: ['mod', 'alt', '-'],
	},
];

export const SectionBlock = ({ editor }: { editor: Editor }) => {
	return <ToolbarActions editor={editor} actions={format_actions} />;
};

export default SectionBlock;
