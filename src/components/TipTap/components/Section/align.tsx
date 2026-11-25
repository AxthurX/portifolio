import type { Editor } from '@tiptap/react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import type { ALIGN_VALUES } from '../../constants';
import type { FormatAction } from '../../interfaces/types';
import { ToolbarActions } from '../toolbar-actions';

type AlignValue = (typeof ALIGN_VALUES)[number];

type TextAlignAction = 'left' | 'center' | 'right' | 'justify';

interface TextAlign extends FormatAction {
	value: TextAlignAction;
}

const getAlignCommand = (editor: Editor, align: AlignValue) => {
	if (editor.isActive('image')) {
		return editor.commands.setImageAlign(align);
	}

	if (editor.isActive('video')) {
		return editor.commands.setVideoAlign(align);
	}

	if (editor.isActive('youtube')) {
		return editor.commands.setYoutubeAlign(align);
	}

	return editor
		.chain()
		.focus()
		.setImageTextAlign(align)
		.setTextAlign(align)
		.run();
};

const isAlignActive = (editor: Editor, align: AlignValue) => {
	if (editor.isActive('image')) {
		const { float, margin } = editor.getAttributes('image');

		if (align === 'center') {
			return float === 'none' && margin === '0 auto';
		}

		if (align === 'left' || align === 'right') {
			return float === align;
		}

		return false;
	}

	if (editor.isActive('video') || editor.isActive('youtube')) {
		const { float, margin } = editor.getAttributes('video');

		if (align === 'center') {
			return float === 'none' && margin === '0 auto';
		}

		if (align === 'left' || align === 'right') {
			return float === align;
		}

		return false;
	}
	return editor.isActive({ textAlign: align });
};

const canAlign = (editor: Editor, align: AlignValue) => {
	if (
		editor.isActive('image') ||
		editor.isActive('video') ||
		editor.isActive('youtube')
	) {
		return true;
	}

	return editor.can().chain().focus().setTextAlign(align).run();
};

const format_actions: TextAlign[] = [
	{
		value: 'left',
		label: 'Alinhar à esquerda',
		icon: <AlignLeft className='size-5' />,
		action: (editor) => getAlignCommand(editor, 'left'),
		isActive: (editor) => isAlignActive(editor, 'left'),
		canExecute: (editor) => canAlign(editor, 'left'),
		shortcuts: ['Ctrl', 'shift', 'L'],
	},
	{
		value: 'center',
		label: 'Centralizar',
		icon: <AlignCenter className='size-5' />,
		action: (editor) => getAlignCommand(editor, 'center'),
		isActive: (editor) => isAlignActive(editor, 'center'),
		canExecute: (editor) => canAlign(editor, 'center'),
		shortcuts: ['Ctrl', 'shift', 'E'],
	},
	{
		value: 'right',
		label: 'Alinhar à direita',
		icon: <AlignRight className='size-5' />,
		action: (editor) => getAlignCommand(editor, 'right'),
		isActive: (editor) => isAlignActive(editor, 'right'),
		canExecute: (editor) => canAlign(editor, 'right'),
		shortcuts: ['Ctrl', 'shift', 'R'],
	},
	{
		value: 'justify',
		label: 'Justificar',
		icon: <AlignJustify className='size-5' />,
		action: (editor) => getAlignCommand(editor, 'justify'),
		isActive: (editor) => isAlignActive(editor, 'justify'),
		canExecute: (editor) => canAlign(editor, 'justify'),
		shortcuts: ['Ctrl', 'shift', 'J'],
	},
];

export const SectionAlign = ({ editor }: { editor: Editor }) => {
	return (
		<div className='mx-2 flex items-center justify-center'>
			<ToolbarActions editor={editor} actions={format_actions} />
		</div>
	);
};

export default SectionAlign;
