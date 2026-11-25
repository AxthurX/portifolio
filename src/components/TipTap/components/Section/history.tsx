import type { Editor } from '@tiptap/react';
import { Redo, Undo } from 'lucide-react';

export const SectionHistory = ({ editor }: { editor: Editor }) => {
	return (
		<div className='mx-2 flex items-center justify-around gap-2 **:cursor-pointer **:p-0.5 **:hover:opacity-80'>
			<button
				type='button'
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().undo().run();
				}}
				disabled={!editor.can().undo()}
				className={!editor.can().undo() ? 'tiptap-disable-button' : ''}
			>
				<Undo className='size-7' />
			</button>
			<button
				type='button'
				onClick={(e) => {
					e.preventDefault();
					editor.chain().focus().redo().run();
				}}
				disabled={!editor.can().redo()}
				className={!editor.can().redo() ? 'tiptap-disable-button' : ''}
			>
				<Redo className='size-7' />
			</button>
		</div>
	);
};

export default SectionHistory;
