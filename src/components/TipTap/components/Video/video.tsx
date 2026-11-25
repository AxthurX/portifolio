import type { Editor } from '@tiptap/react';
import { SquarePlay, VideoIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ToolbarButton } from '../toolbar-button';
import VideoCreate from './video-create';

interface VideoProps {
	editor: Editor;
	toolbar: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Video = ({ editor, toolbar, open: controlledOpen, onOpenChange }: VideoProps) => {
	const [internalOpen, setInternalOpen] = useState(false);

	const isControlled = controlledOpen !== undefined;

	const open = isControlled ? controlledOpen : internalOpen;

	const handleOpenChange = (value: boolean) => {
		if (!isControlled) {
			setInternalOpen(value);
		}

		onOpenChange?.(value);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			{!isControlled && (
				<DialogTrigger asChild>
					<ToolbarButton
						label='Mídia'
						isActive={editor.isActive('video')}
						className={cn(
							'flex min-w-max',
							!toolbar &&
							'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
						)}
					>
						<SquarePlay className={cn('size-6', !toolbar && 'mr-1')} />
						{!toolbar && 'Mídia'}
					</ToolbarButton>
				</DialogTrigger>
			)}

			<DialogContent className='bg-base-100 max-w-4xl p-0'>
				<DialogHeader className='bg-primary rounded-md p-6 text-white'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div className='flex items-center gap-3'>
								<div className='rounded-lg bg-white/20 p-2'>
									<VideoIcon className='h-6 w-6' />
								</div>
								<DialogTitle className='text-2xl font-bold'>Inserir Mídia</DialogTitle>
							</div>
						</div>
						<Button
							variant='ghost'
							size='icon'
							className='text-white'
							aria-label='Fechar'
							onClick={() => handleOpenChange(false)}
						>
							<X className='size-5' />
						</Button>
					</div>
				</DialogHeader>
				<VideoCreate editor={editor} close={() => handleOpenChange(false)} />
			</DialogContent>
		</Dialog>
	);
};
