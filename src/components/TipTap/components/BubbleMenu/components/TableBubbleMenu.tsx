import type { Editor } from '@tiptap/core';
import { isActive } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react/menus';
import { useCallback } from 'react';
import { Separator } from '@/components/ui/separator';
import { DropletIcon } from '../../../icons/Droplet';
import { ActionButton } from '../../ActionButton';
import ColorPicker from '../../ColorPicker';
import type { TableProperties } from '../../Table/table-properties';

export interface TableBubbleMenuProps {
	editor: Editor;
	disabled?: boolean;
}

export const TableBubbleMenu = ({ editor, disabled }: TableBubbleMenuProps) => {
	const table_props = editor.getAttributes('tableCell') as TableProperties;

	const shouldShow = ({ editor }: { editor: Editor }) => {
		return isActive(editor.view.state, 'table');
	};

	const onAddColumnBefore = useCallback(() => {
		editor.chain().focus().addColumnBefore().run();
	}, [editor]);

	const onAddColumnAfter = useCallback(() => {
		editor.chain().focus().addColumnAfter().run();
	}, [editor]);

	const onDeleteColumn = useCallback(() => {
		editor.chain().focus().deleteColumn().run();
	}, [editor]);

	const onAddRowAbove = useCallback(() => {
		editor.chain().focus().addRowBefore().run();
	}, [editor]);

	const onAddRowBelow = useCallback(() => {
		editor.chain().focus().addRowAfter().run();
	}, [editor]);

	const onDeleteRow = useCallback(() => {
		editor.chain().focus().deleteRow().run();
	}, [editor]);

	const onMergeCell = useCallback(() => {
		editor.chain().focus().mergeCells().run();
	}, [editor]);

	const onSplitCell = useCallback(() => {
		editor.chain().focus().splitCell().run();
	}, [editor]);

	const onDeleteTable = useCallback(() => {
		editor.chain().focus().deleteTable().run();
	}, [editor]);

	return (
		<BubbleMenu
			editor={editor}
			pluginKey='table'
			shouldShow={shouldShow}
			updateDelay={0}
			options={{
				offset: {
					mainAxis: 8,
					alignmentAxis: 0,
				},
				flip: false,
			}}
		>
			{!disabled && (
				<div className='border-beige-800/80 flex min-w-32 items-center gap-0.5 rounded-lg border bg-white p-2 shadow-sm'>
					{/* temporariamente desativado por que o tiptap passou a funcionar de outra forma, parando funções como
						largura da bordar, cor da borda e estilo da borda */}
					{/* <TableProperties editor={editor} toolbar={true} /> */}

					<ActionButton
						action={onAddColumnBefore}
						disabled={!editor.can().addColumnBefore()}
						icon='BetweenHorizonalEndIcon'
						tooltip='Inserir coluna antes'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ActionButton
						action={onAddColumnAfter}
						disabled={!editor.can().addColumnAfter()}
						icon='BetweenHorizonalStartIcon'
						tooltip='Inserir coluna depois'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ActionButton
						action={onDeleteColumn}
						disabled={!editor.can().deleteColumn()}
						icon='DeleteColumn'
						tooltip='Apagar coluna'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<Separator className='m-1 h-6' orientation='vertical' />

					<ActionButton
						action={onAddRowAbove}
						disabled={!editor.can().addRowBefore()}
						icon='BetweenVerticalEnd'
						tooltip='Inserir linha acima'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ActionButton
						action={onAddRowBelow}
						disabled={!editor.can().addRowAfter()}
						icon='BetweenVerticalStart'
						tooltip='Inserir linha abaixo'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ActionButton
						action={onDeleteRow}
						disabled={!editor.can().deleteRow()}
						icon='DeleteRow'
						tooltip='Apagar linha'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<Separator className='m-1 h-6' orientation='vertical' />

					<ActionButton
						action={onMergeCell}
						disabled={!editor.can().mergeCells()}
						icon='TableCellsMerge'
						tooltip='Agrupar células'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ActionButton
						action={onSplitCell}
						disabled={!editor.can().splitCell()}
						icon='TableCellsSplit'
						tooltip='Dividir células'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<Separator className='m-1 h-6' orientation='vertical' />

					<ActionButton
						action={onDeleteTable}
						disabled={!editor.can().deleteTable()}
						icon='Trash2'
						tooltip='Apagar tabela'
						tooltip-options={{
							sideOffset: 15,
						}}
					/>

					<ColorPicker
						editor={editor}
						toolbar={true}
						icon={<DropletIcon className='ml-0! size-5!' color={table_props.backgroundColor} />}
						attribute={`${table_props.backgroundColor || 'Cor do fundo'}`}
						tooltip='Cor do fundo'
						className='h-9 rounded-md bg-white px-2 py-0'
						handleUnset={(editor) => {
							editor.chain().focus().setCellAttribute('backgroundColor', '').run();
						}}
						handleApply={(editor, value) => {
							editor.chain().focus().setCellAttribute('backgroundColor', value).run();
						}}
					/>
				</div>
			)}
		</BubbleMenu>
	);
};
