import { CaretDownIcon, LetterCaseCapitalizeIcon } from '@radix-ui/react-icons';
import type { Level } from '@tiptap/extension-heading';
import type { Editor } from '@tiptap/react';
import type { JSX } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui//dropdown-menu';
import type { FormatAction } from '../../interfaces/types';
import { ShortcutKey } from '../shortcut-key';
import ToolbarButton from '../toolbar-button';

interface TextStyle
	extends Omit<
		FormatAction,
		'value' | 'icon' | 'action' | 'isActive' | 'canExecute'
	> {
	element: keyof JSX.IntrinsicElements;
	level?: Level;
	className: string;
}

const format_actions: TextStyle[] = [
	{
		label: 'Texto Normal',
		element: 'span',
		className: 'grow',
		shortcuts: ['mod', 'alt', '0'],
	},
	{
		label: 'Título 1',
		element: 'h1',
		level: 1,
		className: 'm-0 grow text-2xl font-extrabold',
		shortcuts: ['mod', 'alt', '1'],
	},
	{
		label: 'Título 2',
		element: 'h2',
		level: 2,
		className: 'm-0 grow text-xl font-bold',
		shortcuts: ['mod', 'alt', '2'],
	},
	{
		label: 'Título 3',
		element: 'h3',
		level: 3,
		className: 'm-0 grow text-lg font-semibold',
		shortcuts: ['mod', 'alt', '3'],
	},
	{
		label: 'Título 4',
		element: 'h4',
		level: 4,
		className: 'm-0 grow text-base font-medium',
		shortcuts: ['mod', 'alt', '4'],
	},
	{
		label: 'Título 5',
		element: 'h5',
		level: 5,
		className: 'm-0 grow text-sm font-normal',
		shortcuts: ['mod', 'alt', '5'],
	},
	{
		label: 'Título 6',
		element: 'h6',
		level: 6,
		className: 'm-0 grow text-sm font-normal',
		shortcuts: ['mod', 'alt', '6'],
	},
	{
		label: 'Pré-formatado',
		element: 'pre',
		className: 'grow',
	},
];

export const SectionHeading = ({ editor }: { editor: Editor }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ToolbarButton
					isActive={editor.isActive('heading')}
					pressed={editor.isActive('heading')}
					className='w-12 p-1 focus-visible:ring-0 focus-visible:ring-offset-0'
				>
					<LetterCaseCapitalizeIcon className='size-5' />
					<CaretDownIcon className='size-5' />
				</ToolbarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='w-48'>
				{format_actions.map(
					({ label, level, className, shortcuts, element: Element }) => (
						<DropdownMenuItem
							key={label}
							aria-label={label}
							onClick={() =>
								level
									? editor.chain().focus().toggleHeading({ level }).run()
									: editor.chain().focus().setParagraph().run()
										? editor.chain().focus().togglePreBlock().run()
										: editor.chain().focus().setParagraph().run()
							}
							className={
								editor.isActive('heading', { level })
									? 'is-active bg-neutral-300/50'
									: ''
							}
						>
							<Element className={className}>{label}</Element>
							<ShortcutKey keys={shortcuts || []} />
						</DropdownMenuItem>
					),
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SectionHeading;
