import { CaretDownIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import { FaListOl, FaListUl } from 'react-icons/fa';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BulletListIcon } from '../../icons/BulletList';
import { CircleListIcon } from '../../icons/CircleList';
import { LowerAlphaListIcon } from '../../icons/LowerAlphaList';
import { LowerRomanListIcon } from '../../icons/LowerRomanList';
import { OrderedListIcon } from '../../icons/OrderedList';
import { SquareListIcon } from '../../icons/SquareList';
import { UpperAlphaListIcon } from '../../icons/UpperAlphaList';
import { UpperRomanListIcon } from '../../icons/UpperRomanList';
import type { FormatAction } from '../../interfaces/types';
import ToolbarButton from '../toolbar-button';

type ListItemAction =
	| 'bullet'
	| 'square'
	| 'circle'
	| 'ordered'
	| 'lowerAlpha'
	| 'upperAlpha'
	| 'lowerRoman'
	| 'upperRoman';

interface ListItem extends Partial<FormatAction> {
	value: ListItemAction;
	className?: string | null;
	isOrdered?: boolean;
}

const format_actions: ListItem[] = [
	{
		value: 'bullet',
		label: 'Ponto',
		icon: <BulletListIcon />,
		className: 'list-[disc] !important',
	},
	{
		value: 'square',
		label: 'Quadrado',
		icon: <SquareListIcon />,
		className: 'list-[square] !important',
	},
	{
		value: 'circle',
		label: 'Círculo',
		icon: <CircleListIcon />,
		className: 'list-[circle] !important',
	},
	{
		value: 'ordered',
		label: 'Numerada',
		icon: <OrderedListIcon />,
		isOrdered: true,
	},
	{
		value: 'lowerAlpha',
		label: 'Letra minúscula',
		icon: <LowerAlphaListIcon />,
		className: 'list-[lower-alpha] !important',
	},
	{
		value: 'upperAlpha',
		label: 'Letra maiúscula',
		icon: <UpperAlphaListIcon />,
		className: 'list-[upper-alpha] !important',
	},
	{
		value: 'lowerRoman',
		label: 'Romano minúscula',
		icon: <LowerRomanListIcon />,
		className: 'list-[lower-roman] !important',
	},
	{
		value: 'upperRoman',
		label: 'Romano maiúscula',
		icon: <UpperRomanListIcon />,
		className: 'list-[upper-roman] !important',
	},
];

export const SectionList = ({ editor }: { editor: Editor }) => {
	const [bullet_list, ordered_list] = [
		format_actions.slice(0, 3),
		format_actions.slice(3),
	];

	const bullet_list_dropdown_active = bullet_list.some((a) =>
		a.className ? editor.isActive('bulletList', { class: a.className }) : false,
	);

	const ordered_list_dropdown_active = ordered_list.some((a) =>
		a.isOrdered ? editor.isActive('orderedList') : false,
	);

	const handleClick = (action: ListItem) => {
		const { className, isOrdered } = action;

		// já ativo → desativa
		if (isOrdered && editor.isActive('orderedList')) {
			editor.chain().focus().toggleOrderedList().run();
			return;
		}

		if (className && editor.isActive('bulletList', { class: className })) {
			editor.chain().focus().toggleBulletList().run();
			return;
		}

		if (editor.isActive('orderedList')) {
			editor.chain().focus().toggleOrderedList().run();
		} else if (editor.isActive('bulletList')) {
			editor.chain().focus().toggleBulletList().run();
		}

		if (isOrdered) {
			editor.chain().focus().toggleOrderedList().run();
		} else if (className) {
			editor.chain().focus().toggleClass(className).run();
		}
	};

	return (
		<div className='flex items-center gap-2'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<ToolbarButton
						isActive={bullet_list_dropdown_active}
						className='w-full gap-x-1 border-none px-2 ring-0 focus-visible:ring-0'
					>
						<FaListUl className='size-5' />
						<CaretDownIcon className='size-6' />
					</ToolbarButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start' className='flex gap-x-0.5'>
					{bullet_list.map((action) => {
						const active = action.className
							? editor.isActive('bulletList', { class: action.className })
							: false;

						return (
							<DropdownMenuItem key={action.label} asChild>
								<ToolbarButton
									key={action.label}
									label={action.label}
									className='size-full border-none'
									onClick={() => handleClick(action)}
									isActive={active}
								>
									{action.icon}
								</ToolbarButton>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<ToolbarButton
						isActive={ordered_list_dropdown_active}
						className='w-full gap-x-1 border-none px-2 ring-0 focus-visible:ring-0'
					>
						<FaListOl className='size-5' />
						<CaretDownIcon className='size-6' />
					</ToolbarButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start' className='flex gap-x-0.5'>
					{ordered_list.map((action) => {
						const active = action.isOrdered
							? editor.isActive('orderedList')
							: action.className
								? editor.isActive('bulletList', { class: action.className })
								: false;

						return (
							<DropdownMenuItem key={action.label} asChild>
								<ToolbarButton
									key={action.label}
									isActive={active}
									className='size-full border-none'
									onClick={() => handleClick(action)}
								>
									{action.icon}
								</ToolbarButton>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default SectionList;
