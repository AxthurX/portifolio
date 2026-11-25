import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/core';
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
} from 'lucide-react';
import { memo, type ReactNode, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionButtonImage, ActionWrapper } from '../buttons';

interface ImageAlignProps {
	editor: Editor;
	shouldMerge?: boolean;
}

type ActionKey = 'left' | 'center' | 'right' | 'justify';

const actions: Array<{
	key: ActionKey;
	icon: ReactNode;
	title: string;
}> = [
		{
			key: 'left',
			icon: <AlignLeftIcon className='size-4' />,
			title: 'À esquerda',
		},
		{
			key: 'center',
			icon: <AlignCenterIcon className='size-4' />,
			title: 'Centro',
		},
		{
			key: 'right',
			icon: <AlignRightIcon className='size-4' />,
			title: 'À direita',
		},
		{
			key: 'justify',
			icon: <AlignJustifyIcon className='size-4' />,
			title: 'Justificado',
		},
	];

export const ImageAlign = memo(({ editor, shouldMerge }: ImageAlignProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleAction = (position: string) => {
		editor.chain().focus().setImageAlign(position).run();
	};

	return (
		<ActionWrapper className='left-3 z-50'>
			{shouldMerge ? (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<ActionButtonImage
							tooltip='Abrir menu'
							icon={<DotsHorizontalIcon className='size-5' />}
							onClick={(e) => e.preventDefault()}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-auto' align='center'>
						{actions.map(({ key, icon, title }) => (
							<DropdownMenuItem key={key} onClick={() => handleAction(key)}>
								<div className='flex items-center gap-2'>
									{icon}
									<span>{title}</span>
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				actions.map(({ key, icon }) => (
					<ActionButtonImage
						key={key}
						icon={icon}
						onClick={() => handleAction(key)}
					/>
				))
			)}
		</ActionWrapper>
	);
});

ImageAlign.displayName = 'ImageAlign';
