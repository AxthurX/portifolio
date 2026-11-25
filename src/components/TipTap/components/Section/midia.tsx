import type { Editor } from '@tiptap/core';
import { TextExcalidraw } from '../../extensions/excalidraw';
import { Gallery } from '../Gallery/gallery';
import { Image } from '../Image/image';
import { Video } from '../Video/video';

export const SectionMidia = ({ editor }: { editor: Editor }) => {
	return (
		<div className='flex items-center'>
			<Image editor={editor} toolbar={true} />
			<Video editor={editor} toolbar={true} />
			<Gallery editor={editor} toolbar={true} />
			<TextExcalidraw editor={editor} />
		</div>
	);
};

export default SectionMidia;
