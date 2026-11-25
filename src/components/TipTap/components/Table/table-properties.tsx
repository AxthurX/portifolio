'use client';

import type { Editor } from '@tiptap/core';
import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { cn, extractNumbers } from '@/lib/utils';
import { BORDER_STYLE_LIST } from '../../constants';
import { DropletIcon } from '../../icons/Droplet';
import ColorPicker from '../ColorPicker';
import ToolbarButton from '../toolbar-button';

export interface TableProperties {
	borderWidth: number;
	borderStyle: string;
	borderColor: string;
	backgroundColor: string;
}

export function TableProperties({ editor, toolbar }: { editor: Editor; toolbar: boolean }) {
	const table_props = editor.getAttributes('table') as TableProperties;
	const [open, setOpen] = useState<boolean>(false);

	const [properties, setProperties] = useState<TableProperties>({
		borderWidth: extractNumbers(String(table_props.borderWidth)) || 1,
		borderStyle: table_props.borderStyle || 'solid',
		borderColor: table_props.borderColor || '#000000',
		backgroundColor: table_props.backgroundColor || '#ffffff',
	});

	const handleValueChange = (value: number[], prop: keyof TableProperties) => {
		const raw_value = value[0];
		const floor_value = Math.floor(raw_value);
		const ceil_value = Math.ceil(raw_value);

		if (raw_value - floor_value > 0.5) {
			setProperties({ ...properties, [prop]: ceil_value });
		} else {
			setProperties({
				...properties,
				[prop]: floor_value,
			});
		}
	};

	const handleTableProperties = () => {
		editor.chain().focus().updateAttributes('table', properties).run();
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<ToolbarButton
					label='Propriedades da tabela'
					disabled={!editor.isActive('table')}
					className={cn(
						'flex min-w-max',
						!toolbar &&
						'flex w-full items-center justify-start gap-2 rounded-sm border-none px-2 py-1.5 text-sm font-medium',
					)}
				>
					<Settings className={cn('size-5', !toolbar && 'mr-1 size-6')} />
					{!toolbar && 'Propriedades da tabela'}
				</ToolbarButton>
			</DialogTrigger>
			<DialogContent className='bg-base-100 max-w-4xl p-0'>
				<DialogHeader className='bg-primary rounded-md p-6 text-white'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div className='flex items-center gap-3'>
								<div className='rounded-lg bg-white/20 p-2'>
									<Settings className='h-6 w-6' />
								</div>
								<DialogTitle className='text-2xl font-bold'>Propriedades da tabela</DialogTitle>
							</div>
						</div>
						<Button
							variant='ghost'
							size='icon'
							className='text-white'
							aria-label='Fechar'
							onClick={() => setOpen(false)}
						>
							<X className='size-5' />
						</Button>
					</div>
				</DialogHeader>
				<div className='p-3'>
					<div className='bg-base-100/90 ring-offset-background focus-visible:ring-ring space-y-4 px-3 py-2 pt-0.5 pb-1.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'>
						<div>
							<Label>Estilo da borda</Label>
							<Select
								defaultValue={properties.borderStyle}
								onValueChange={(e) => setProperties({ ...properties, borderStyle: e })}
							>
								<SelectTrigger>
									<SelectValue placeholder='Selecione um estilo' />
								</SelectTrigger>
								<SelectContent>
									{BORDER_STYLE_LIST.map((style) => (
										<SelectItem key={style.value} value={style.value}>
											{style.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-3'>
							<div className='flex items-center justify-between'>
								<Label>Espessura da borda</Label>
								<span className='text-sm font-semibold'>{properties.borderWidth}px</span>
							</div>
							<Slider
								step={1}
								min={0}
								max={30}
								orientation='vertical'
								value={[properties.borderWidth]}
								onValueChange={(e) => handleValueChange(e, 'borderWidth')}
							/>
						</div>
						<div className='grid grid-cols-2 gap-2'>
							<div>
								<Label>Cor da borda</Label>
								<ColorPicker
									editor={editor}
									toolbar={false}
									icon={<DropletIcon color={properties.borderColor} />}
									attribute='borderColor'
									tooltip={`${properties.borderColor || 'Cor da borda'}`}
									className='h-10 rounded-md bg-white p-2'
									handleUnset={(_editor) => setProperties((prev) => ({ ...prev, borderColor: '' }))}
									handleApply={(_editor, value) =>
										setProperties((prev) => ({ ...prev, borderColor: value }))
									}
								/>
							</div>
							<div>
								<Label>Cor do fundo</Label>
								<ColorPicker
									editor={editor}
									toolbar={false}
									icon={<DropletIcon color={properties.backgroundColor} />}
									attribute={`${properties.backgroundColor || 'Cor do fundo'}`}
									tooltip='Cor do fundo'
									className='h-10 rounded-md bg-white p-2'
									handleUnset={(_editor) =>
										setProperties((prev) => ({
											...prev,
											backgroundColor: '',
										}))
									}
									handleApply={(_editor, value) =>
										setProperties((prev) => ({
											...prev,
											backgroundColor: value,
										}))
									}
								/>
							</div>
						</div>
					</div>
					<div className='flex justify-end space-x-2'>
						<Button variant='destructive' onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleTableProperties}>Salvar</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
