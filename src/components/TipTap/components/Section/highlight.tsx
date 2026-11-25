import type { Editor } from '@tiptap/react';
import { HighlightIcon } from '../../icons/Highlight';
import ColorPicker from '../ColorPicker';

export const SectionHighlight = ({ editor, toolbar }: { editor: Editor; toolbar: boolean }) => {
	return (
		<ColorPicker
			editor={editor}
			toolbar={toolbar}
			icon={<HighlightIcon color={editor.getAttributes('highlight').color} />}
			attribute='highlight'
			tooltip='Cor do fundo'
			handleUnset={(editor) => editor.chain().focus().unsetHighlight().run()}
			handleApply={(editor, value) => editor.chain().setHighlight({ color: value }).run()}
		/>
	);
};

export default SectionHighlight;
