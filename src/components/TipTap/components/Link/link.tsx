import type { Editor } from '@tiptap/react';
import { LinkIcon, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ToolbarButton } from '../toolbar-button';
import { LinkCreate } from './link-create';

interface LinkProps {
	editor: Editor;
	toolbar: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export const Link = ({ editor, toolbar, open: controlledOpen, onOpenChange }: LinkProps) => {
	const [internalOpen, setInternalOpen] = useState(false);

	const isControlled = controlledOpen !== undefined;

	const open = isControlled ? controlledOpen : internalOpen;

	const handleOpenChange = (value: boolean) => {
		if (!isControlled) {
			setInternalOpen(value);
		}

		onOpenChange?.(value);
	};

	const { from, to } = editor.state.selection;
	const text = editor.state.doc.textBetween(from, to, ' ');

	const onSetLink = useCallback(
		(url: string, text?: string, openInNewTab?: boolean, className?: string) => {
			const { state } = editor;
			const { from } = state.selection;
			const new_text = text || url;
			const insertedLength = new_text.length;
			const to = from + insertedLength;

			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.insertContent({
					type: 'text',
					text: new_text,
					marks: [
						{
							type: 'link',
							attrs: {
								href: url,
								target: openInNewTab ? '_blank' : '',
								class: className,
							},
						},
					],
				})
				.setLink({ href: url })
				.setTextSelection({ from, to })
				.focus()
				.run();
		},
		[editor],
	);

	return (
		<Popover open={open} onOpenChange={handleOpenChange}>
			{!isControlled && (
				<PopoverTrigger asChild>
					<ToolbarButton
						label='Inserir link'
						isActive={editor.isActive('link')}
						className={cn(
							'flex min-w-max',
							!toolbar &&
							'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
						)}
					>
						<LinkIcon className={cn('size-5', !toolbar && 'mr-1 size-6')} />
						{!toolbar && 'Link'}
					</ToolbarButton>
				</PopoverTrigger>
			)}

			<PopoverContent side='bottom' align='center' className='bg-base-100 min-w-90 p-0'>
				<div className='bg-primary flex items-center justify-between rounded p-3'>
					<div className='flex items-center gap-3 text-white'>
						<div className='rounded-lg bg-white/20 p-2'>
							<LinkIcon className='size-6' />
						</div>
						<h2 className='text-2xl font-bold'>Inserir Link</h2>
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

				<LinkCreate editor={editor} onSave={onSetLink} defaultText={text} />
			</PopoverContent>
		</Popover>
	);
};
