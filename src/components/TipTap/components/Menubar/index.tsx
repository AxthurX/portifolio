import type { Editor } from '@tiptap/core';
import { type ElementType, type ReactNode, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import ToolbarButton from '../toolbar-button';
import { Items } from './items';

export type MenuItem = {
	label?: string;
	icon?: ElementType;
	component?: ReactNode;
	shortcut?: string;
	separator?: boolean;
	children?: MenuItem[];
	action?: (editor: Editor) => void;
	isActive?: (editor: Editor) => boolean;
	canExecute?: (editor: Editor) => boolean;
};

export type DialogType = 'file' | 'gallery' | 'image' | 'link' | 'video' | null;

const MenuItem = ({ item, editor }: { item: MenuItem; editor: Editor }) => {
	const ref = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);

	if (item.separator) {
		return <DropdownMenuSeparator className='my-1 bg-gray-200/70' />;
	}

	if (item.component) {
		return (
			<DropdownMenuItem
				className='p-0'
				onSelect={(event) => {
					event.preventDefault();
				}}
			>
				{item.component}
			</DropdownMenuItem>
		);
	}

	if (item.children) {
		return (
			<DropdownMenuSub open={open} onOpenChange={setOpen}>
				<DropdownMenuSubTrigger
					className='hover:bg-sage-400/40! focus:bg-base-100 data-[state=open]:bg-base-100'
					onSelect={() => setOpen(!open)}
				>
					{item.icon ? <item.icon className='size-5' /> : <span className='pl-6' />}
					{item.label}
				</DropdownMenuSubTrigger>
				<DropdownMenuSubContent className='bg-primary-content max-h-100 overflow-y-auto'>
					{item.children.map((child, index) => (
						<MenuItem item={child} editor={editor} key={String(child.label) ?? index} />
					))}
				</DropdownMenuSubContent>
			</DropdownMenuSub>
		);
	}

	const handleClick = () => {
		if (item.action) item.action(editor);
	};

	return (
		<DropdownMenuItem
			ref={ref}
			className='p-0'
			onSelect={handleClick}
			disabled={item.canExecute ? !item.canExecute(editor) : false}
		>
			<ToolbarButton className='flex w-full items-center justify-start gap-2 rounded-sm px-2 py-1.5 text-sm'>
				{item.icon && <item.icon className='mr-1 size-5!' />}
				{item.label}
				{item.shortcut && <span className='ml-auto text-xs'>({item.shortcut})</span>}
			</ToolbarButton>
		</DropdownMenuItem>
	);
};

interface MenubarProps {
	editor: Editor;
	className?: string;
	onOpenDialog: (dialog: Exclude<DialogType, null>) => void;
}

const Menubar = ({ editor, className, onOpenDialog }: MenubarProps) => {
	const [openMenu, setOpenMenu] = useState<string | null>(null);

	const menu_items = editor ? Items(editor, onOpenDialog) : [];

	if (!editor) return null;

	return (
		<div
			className={cn(
				className,
				'bg-primary-content flex flex-wrap items-center rounded-t-md px-2 py-1',
			)}
		>
			{menu_items.map((item) => (
				<DropdownMenu
					key={item.label}
					modal={false}
					open={openMenu === item.label}
					onOpenChange={(isOpen) => setOpenMenu(isOpen ? (item.label ?? null) : null)}
				>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='hover:bg-sage-500/30 hover:text-base-content/60 border-0 bg-transparent px-2 font-normal shadow-none transition duration-150 focus-visible:ring-0 focus-visible:ring-offset-0'
						>
							{item.label}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='bg-primary-content z-50'>
						{item.children?.map((child, index) => (
							<MenuItem item={child} editor={editor} key={child.label ?? index} />
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			))}
		</div>
	);
};

export default Menubar;
