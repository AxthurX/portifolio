import type { Editor } from '@tiptap/react';
import { TextColorIcon } from '../../icons/TextColor';
import ColorPicker from '../ColorPicker';

export const SectionColor = ({
	editor,
	toolbar,
}: {
	editor: Editor;
	toolbar: boolean;
}) => {
	return (
		<ColorPicker
			editor={editor}
			toolbar={toolbar}
			icon={<TextColorIcon color={editor.getAttributes('textStyle').color} />}
			attribute='textStyle'
			tooltip='Cor do texto'
			handleUnset={(editor) => editor.chain().focus().unsetColor().run()}
			handleApply={(editor, value) => editor.chain().setColor(value).run()}
		/>
	);
};

export default SectionColor;
