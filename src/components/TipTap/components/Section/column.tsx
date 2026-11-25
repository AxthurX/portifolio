'use client';

import type { Editor } from '@tiptap/react';
import { Columns } from 'lucide-react';
import { cn } from '@/lib/utils';
import ToolbarButton from '../toolbar-button';

export const SectionColumn = ({ editor, toolbar }: { editor: Editor; toolbar: boolean }) => {
	return (
		<ToolbarButton
			label='Colunas'
			isActive={editor.isActive('column')}
			onClick={() => editor.chain().focus().insertColumns({ cols: 2 }).run()}
			className={cn(
				'flex min-w-max',
				!toolbar &&
				'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
			)}
		>
			<Columns className={cn('size-6', !toolbar && 'mr-1')} />
			{!toolbar && 'Colunas'}
		</ToolbarButton>
	);
};

export default SectionColumn;
