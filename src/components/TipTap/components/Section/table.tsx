'use client';

import type { Editor } from '@tiptap/core';
import { Table } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Tables from '../Table/table';
import ToolbarButton from '../toolbar-button';

export const SectionTable = ({ editor, toolbar }: { editor: Editor; toolbar: boolean }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<ToolbarButton
					label='Tabela'
					onClick={() => setIsOpen(true)}
					className={cn(
						'flex min-w-max',
						!toolbar &&
						'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
					)}
				>
					<Table className={cn('size-6', !toolbar && 'mr-1')} />
					{!toolbar && 'Tabela'}
				</ToolbarButton>
			</PopoverTrigger>
			<PopoverContent side='right' align='start' className='w-full p-0'>
				<Tables editor={editor} />
			</PopoverContent>
		</Popover>
	);
};

export default SectionTable;
