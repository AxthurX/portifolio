import type { Editor } from '@tiptap/core';
import { DragHandle } from '@tiptap/extension-drag-handle-react';
import type { Node } from '@tiptap/pm/model';
import type { NodeSelection, PluginKey } from '@tiptap/pm/state';
import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { IndentProps, setNodeIndentMarkup } from '../../../extensions/indent';
import { IconComponent } from '../../../icons';
import { ActionButton } from '../../ActionButton';

export interface ContentMenuProps {
	editor: Editor;
	disabled?: boolean;
	className?: string;
	pluginKey?: PluginKey;
}

export function ContentMenu({ editor, disabled = false, className }: ContentMenuProps) {
	const [currentNode, setCurrentNode] = useState<Node | null>(null);
	const [currentNodePos, setCurrentNodePos] = useState(-1);
	const [menuOpen, setMenuOpen] = useState(false);

	const hasTextAlignExtension = editor.extensionManager.extensions.some(
		(ext) => ext.name === 'textAlign',
	);
	const hasIndentExtension = editor.extensionManager.extensions.some(
		(ext) => ext.name === 'indent',
	);
	const hasClearExtension = editor.extensionManager.extensions.some((ext) => ext.name === 'clear');

	const resetTextFormatting = () => {
		const chain = editor.chain().setNodeSelection(currentNodePos).unsetAllMarks();
		if (currentNode?.type.name !== 'paragraph') chain.setParagraph();
		chain.run();
	};

	const copyNodeToClipboard = () => {
		editor.chain().focus().setNodeSelection(currentNodePos).run();
		document.execCommand('copy');
	};

	const duplicateNode = () => {
		editor.commands.setNodeSelection(currentNodePos);
		const { $anchor } = editor.state.selection;
		const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node;
		editor
			.chain()
			.setMeta('hideDragHandle', true)
			.insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
			.run();
	};

	const setTextAlign = (alignments: string) => {
		editor.commands.setTextAlign(alignments);
	};

	const increaseIndent = () => {
		const tr = setNodeIndentMarkup(editor.state.tr, currentNodePos, 1);
		tr.setMeta('hideDragHandle', true);
		if (editor.view.dispatch) editor.view.dispatch(tr);
	};

	const decreaseIndent = () => {
		const tr = setNodeIndentMarkup(editor.state.tr, currentNodePos, -1);
		if (editor.view.dispatch) editor.view.dispatch(tr);
	};

	const deleteNode = () => {
		editor
			.chain()
			.setMeta('hideDragHandle', true)
			.setNodeSelection(currentNodePos)
			.deleteSelection()
			.run();
	};

	const handleNodeChange = useCallback(
		(e: { editor: Editor; node: Node | null; pos: number }) => {
			setTimeout(() => {
				if (e.node) {
					setCurrentNode(e.node);
				}
				setCurrentNodePos(e.pos);
			}, 0);

			requestAnimationFrame(() => {
				editor.commands.focus();
			});
		},
		[editor.commands.focus],
	);

	useEffect(() => {
		if (menuOpen) {
			editor.commands.setMeta('lockDragHandle', true);
		} else {
			editor.commands.setMeta('lockDragHandle', false);
		}

		return () => {
			editor.commands.setMeta('lockDragHandle', false);
		};
	}, [menuOpen, editor.commands.setMeta]);

	const handleMenuOpenChange = (open: boolean) => {
		if (!disabled) setMenuOpen(open);
	};

	return (
		<DragHandle
			editor={editor}
			onNodeChange={handleNodeChange}
			className={`transition-all duration-200 ease-in-out ${className}`}
			pluginKey={'BubbleMenuDragHandle'}
		>
			<div className='flex items-center gap-0.5'>
				<ActionButton
					disabled={disabled}
					icon='Grip'
					tooltip='Clique para ver as opções'
					action={(e) => {
						const event = e as MouseEvent<HTMLButtonElement>;
						event.preventDefault();
						event.stopPropagation();
						handleMenuOpenChange(!menuOpen);
					}}
				/>

				<DropdownMenu open={menuOpen} onOpenChange={handleMenuOpenChange}>
					<DropdownMenuTrigger className='pointer-events-none' />

					<DropdownMenuContent
						align='start'
						side='bottom'
						sideOffset={0}
						className={cn(
							'w-48 min-w-60 cursor-pointer space-y-1 rounded-lg border bg-white/90 px-3 py-2.5 text-sm font-medium shadow-2xl transition-all duration-150',
						)}
					>
						<DropdownMenuItem className='flex gap-3' onClick={deleteNode}>
							<IconComponent className='size-4 transition-colors duration-150' name='Trash2' />

							<span>Remover</span>
						</DropdownMenuItem>

						{hasClearExtension ? (
							<DropdownMenuItem className='flex gap-3' onClick={resetTextFormatting}>
								<IconComponent
									className='size-4 transition-colors duration-150'
									name='PaintRoller'
								/>
								<span>Limpar formatação</span>
							</DropdownMenuItem>
						) : null}

						<DropdownMenuItem className='flex gap-3' onClick={copyNodeToClipboard}>
							<IconComponent className='size-4 transition-colors duration-150' name='Clipboard' />
							<span>Copiar para área de transferência</span>
						</DropdownMenuItem>

						<DropdownMenuItem className='flex gap-3' onClick={duplicateNode}>
							<IconComponent className='size-4 transition-colors duration-150' name='Copy' />
							<span>Duplicar</span>
						</DropdownMenuItem>

						{(hasTextAlignExtension || hasIndentExtension) && <DropdownMenuSeparator />}

						{hasTextAlignExtension ? (
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className='hover:bg-sage-400/60! focus:bg-base-100 data-[state=open]:bg-base-100 flex gap-3'>
									<IconComponent
										className='size-4 transition-colors duration-150'
										name='AlignCenter'
									/>
									<span>Alinhar texto</span>
								</DropdownMenuSubTrigger>

								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem className='flex gap-3' onClick={() => setTextAlign('left')}>
											<IconComponent
												className='size-4 transition-colors duration-150'
												name='AlignLeft'
											/>
											<span>Alinhar à esquerda</span>
										</DropdownMenuItem>

										<DropdownMenuItem className='flex gap-3' onClick={() => setTextAlign('center')}>
											<IconComponent
												className='size-4 transition-colors duration-150'
												name='AlignCenter'
											/>
											<span>Centralizar</span>
										</DropdownMenuItem>

										<DropdownMenuItem className='flex gap-3' onClick={() => setTextAlign('right')}>
											<IconComponent
												className='size-4 transition-colors duration-150'
												name='AlignRight'
											/>
											<span>Alinhar à direita</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						) : null}

						{hasIndentExtension ? (
							<DropdownMenuSub>
								<DropdownMenuSubTrigger className='hover:bg-sage-400/60! focus:bg-base-100 data-[state=open]:bg-base-100 flex gap-3'>
									<IconComponent
										className='size-4 transition-colors duration-150'
										name='IndentIncrease'
									/>
									<span>Indentar</span>
								</DropdownMenuSubTrigger>

								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem
											className='flex gap-3'
											disabled={currentNode?.attrs?.indent >= IndentProps.max}
											onClick={increaseIndent}
										>
											<IconComponent
												className='size-4 transition-colors duration-150'
												name='IndentIncrease'
											/>
											<span>Indentar</span>
										</DropdownMenuItem>

										<DropdownMenuItem
											className='flex gap-3'
											disabled={currentNode?.attrs?.indent <= IndentProps.min}
											onClick={decreaseIndent}
										>
											<IconComponent
												className='size-4 transition-colors duration-150'
												name='IndentDecrease'
											/>
											<span>Desindentar</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</DragHandle>
	);
}
