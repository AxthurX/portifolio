import { ImageIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import { ImageDownIcon, X } from 'lucide-react';
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
import { ImageCreate } from './image-create';

interface ImageProps {
	editor: Editor;
	toolbar: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Image = ({ editor, toolbar, open: controlledOpen, onOpenChange }: ImageProps) => {
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
						label='Imagem'
						isActive={editor.isActive('image')}
						className={cn(
							'flex min-w-max',
							!toolbar &&
							'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
						)}
					>
						<ImageIcon className={cn('size-6', !toolbar && 'mr-1')} />
						{!toolbar && 'Imagem'}
					</ToolbarButton>
				</DialogTrigger>
			)}

			<DialogContent className='bg-base-100 w-full! max-w-6xl p-0'>
				<DialogHeader className='bg-primary rounded-md p-6 text-white'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div className='flex items-center gap-3'>
								<div className='rounded-lg bg-white/20 p-2'>
									<ImageDownIcon className='h-6 w-6' />
								</div>
								<DialogTitle className='text-2xl font-bold'>Inserir imagem</DialogTitle>
							</div>
						</div>
						<Button
							variant='ghost'
							size='icon'
							aria-label='Fechar'
							onClick={() => handleOpenChange(false)}
						>
							<X className='size-5' />
						</Button>
					</div>
				</DialogHeader>
				<ImageCreate editor={editor} close={() => handleOpenChange(false)} />
			</DialogContent>
		</Dialog>
	);
};
