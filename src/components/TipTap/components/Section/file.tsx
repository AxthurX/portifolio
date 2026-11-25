'use client';

import type { Editor } from '@tiptap/react';
import { File } from '../File/file';

export const SectionFile = ({
	editor,
	toolbar,
}: {
	editor: Editor;
	toolbar: boolean;
}) => {
	return <File editor={editor} toolbar={toolbar} />;
};

export default SectionFile;
