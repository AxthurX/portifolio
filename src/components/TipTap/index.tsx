'use client';

import { type Editor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from './components/BubbleMenu';
import Menubar, { type DialogType } from './components/Menubar';
import Toolbar from './components/Toolbar';
import { type TiptapEditorProps, useTiptapEditor } from './hooks/use-tiptap';
import './styles/index.css';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { File } from './components/File/file';
import { Gallery } from './components/Gallery/gallery';
import { Image } from './components/Image/image';
import { Link } from './components/Link/link';
import { Video } from './components/Video/video';

export interface TiptapProps extends Omit<TiptapEditorProps, 'onUpdate'> {
	defaultValue: string;
	onChange?: (value: string) => void;
	onEditorReady?: (editor: Editor) => void;
	className?: string;
	hideToolbar?: boolean;
}

export const Tiptap = ({
	defaultValue,
	onChange,
	onEditorReady,
	hideToolbar,
	className,
	editable,
	...props
}: TiptapProps) => {
	const editor = useTiptapEditor({
		defaultValue,
		onChange,
		onEditorReady,
		editable,
		...props,
	});

	const [activeDialog, setActiveDialog] = useState<DialogType>(null);

	if (!editor) return null;

	return (
		<TooltipProvider delayDuration={200}>
			<div
				className={cn(
					'tiptap-editor-group flex flex-col rounded-md bg-white',
					!hideToolbar && 'h-[70vh]',
					className,
				)}
			>
			{!hideToolbar && (
				<>
					<Menubar editor={editor} onOpenDialog={setActiveDialog} />
					<Toolbar editor={editor} />
					<BubbleMenu editor={editor} />

					<File
						editor={editor}
						toolbar={false}
						open={activeDialog === 'file'}
						onOpenChange={(open) => setActiveDialog(open ? 'file' : null)}
					/>

					<Gallery
						editor={editor}
						toolbar={false}
						open={activeDialog === 'gallery'}
						onOpenChange={(open) => setActiveDialog(open ? 'gallery' : null)}
					/>

					<Image
						editor={editor}
						toolbar={false}
						open={activeDialog === 'image'}
						onOpenChange={(open) => setActiveDialog(open ? 'image' : null)}
					/>

					<Link
						editor={editor}
						toolbar={false}
						open={activeDialog === 'link'}
						onOpenChange={(open) => setActiveDialog(open ? 'link' : null)}
					/>

					<Video
						editor={editor}
						toolbar={false}
						open={activeDialog === 'video'}
						onOpenChange={(open) => setActiveDialog(open ? 'video' : null)}
					/>
				</>
			)}

			<EditorContent
				editor={editor}
				className={cn(
					'tiptap-editor flex-1',
					!hideToolbar &&
					'scrollbar scrollbar-track-primary/10 scrollbar-thumb-sage-600/40 bg-primary-content flex max-h-[70vh] flex-1 overflow-y-auto',
				)}
			/>
			</div>
		</TooltipProvider>
	);
};

export default Tiptap;
