import { ClipboardCopyIcon, DotsHorizontalIcon, DownloadIcon } from '@radix-ui/react-icons';
import { type MouseEvent, memo, type ReactNode, useCallback, useMemo, useState } from 'react';
import { PiBomb } from 'react-icons/pi';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ActionButtonImage, ActionWrapper } from '../buttons';

interface ImageActionsProps {
	shouldMerge?: boolean;
	isLink?: boolean;
	onRemoveImg?: () => void;
	onCopy?: () => void;
	onView?: () => void;
	onDownload?: () => void;
}

type ActionKey = 'onView' | 'onDownload' | 'onCopy' | 'onRemoveImg';

const ActionItems: Array<{
	key: ActionKey;
	icon: ReactNode;
	tooltip: string;
	isLink?: boolean;
}> = [
		{
			key: 'onDownload',
			icon: <DownloadIcon className='size-4' />,
			tooltip: 'Baixar imagem',
		},
		{
			key: 'onCopy',
			icon: <ClipboardCopyIcon className='size-4' />,
			tooltip: 'Copiar imagem para a área de transferência',
		},
		{
			key: 'onRemoveImg',
			icon: <PiBomb className='size-4' />,
			tooltip: 'Apagar imagem',
		},
	];

export const ImageActions = memo(
	({ shouldMerge = false, isLink = false, ...actions }: ImageActionsProps) => {
		const [isOpen, setIsOpen] = useState(false);

		const handleAction = useCallback((e: MouseEvent, action: (() => void) | undefined) => {
			e.preventDefault();
			e.stopPropagation();
			action?.();
		}, []);

		const filtered_actions = useMemo(
			() => ActionItems.filter((item) => isLink || !item.isLink),
			[isLink],
		);

		return (
			<ActionWrapper className={cn('right-3 z-50', { 'opacity-100': isOpen })}>
				{shouldMerge ? (
					<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
						<DropdownMenuTrigger asChild>
							<ActionButtonImage
								icon={<DotsHorizontalIcon className='size-5' />}
								tooltip='Abrir menu'
								onClick={(e) => e.preventDefault()}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-auto' align='center'>
							{filtered_actions.map(({ key, icon, tooltip }) => (
								<DropdownMenuItem key={key} onClick={(e) => handleAction(e, actions[key])}>
									<div className='flex flex-row items-center gap-2'>
										{icon}
										<span>{tooltip}</span>
									</div>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					filtered_actions.map(({ key, icon, tooltip }) => (
						<ActionButtonImage
							key={key}
							icon={icon}
							tooltip={tooltip}
							onClick={(e) => handleAction(e, actions[key])}
						/>
					))
				)}
			</ActionWrapper>
		);
	},
);

ImageActions.displayName = 'ImageActions';
