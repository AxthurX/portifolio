import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import { RemoveFormatting } from 'lucide-react';
import type { FormatAction } from '../../interfaces/types';
import { ToolbarActions } from '../toolbar-actions';

type TextStyleAction = 'bold' | 'italic' | 'clearFormatting';

interface TextStyle extends FormatAction {
	value: TextStyleAction;
}

const actions: TextStyle[] = [
	{
		value: 'bold',
		label: 'Negrito',
		icon: <FontBoldIcon className='size-5' />,
		action: (editor) => editor.chain().focus().toggleBold().run(),
		isActive: (editor) => editor.isActive('bold'),
		canExecute: (editor) => editor.can().chain().focus().toggleBold().run(),
		shortcuts: ['mod', 'B'],
	},
	{
		value: 'italic',
		label: 'Itálico',
		icon: <FontItalicIcon className='size-5' />,
		action: (editor) => editor.chain().focus().toggleItalic().run(),
		isActive: (editor) => editor.isActive('italic'),
		canExecute: (editor) => editor.can().chain().focus().toggleItalic().run(),
		shortcuts: ['mod', 'I'],
	},
	{
		value: 'clearFormatting',
		label: 'Remover formatação',
		icon: <RemoveFormatting className='size-5' />,
		action: (editor) => editor.chain().focus().unsetAllMarks().run(),
		isActive: () => false,
		canExecute: (editor) => editor.can().chain().focus().unsetAllMarks().run(),
		shortcuts: ['mod', '\\'],
	},
];

export const SectionStyle = ({ editor }: { editor: Editor }) => {
	return <ToolbarActions editor={editor} actions={actions} />;
};

export default SectionStyle;
