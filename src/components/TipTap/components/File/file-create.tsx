'use client';

import type { Editor } from '@tiptap/react';
import type React from 'react';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { usePostContext } from '@/components/TipTap/post-context';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui//tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs } from '@/components/ui/tabs';
import { Alert, clearFileName, formatFileName } from '@/lib/utils';
import { randomID } from '../../utils';
import type { NewFile } from '../Image/image-create';

export default function FileCreate({
	editor,
	setOpen,
}: {
	editor: Editor;
	setOpen: (open: boolean) => void;
}) {
	const [newFiles, setNewFiles] = useState<NewFile[]>([]);
	const [type, setType] = useState<string>('simple');
	const { addFile } = usePostContext();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		const arr_files: NewFile[] = [];

		for (const file of files) {
			if (file.size > 50 * 1024 * 1024) {
				Alert(
					'Atenção',
					`O arquivo selecionado ultrapassa o tamanho máximo permitido. \n
				Tamanho atual: '${(file.size / (1024 * 1024)).toFixed(0)} MB',
				\n Reduza para menos que '50 MB'`,
					'destructive',
				);

				continue;
			}

			if (file.size > 0) {
				const file_alt = file.name;
				const file_id = randomID(12);

				const new_file: NewFile = {
					id: file_id,
					alt_name: file_alt,
					href: formatFileName('temp_sector_name', file_alt),
					file: new File([file], `${file_id}-${clearFileName(file.name)}`, {
						type: file.type,
						lastModified: file.lastModified,
					}),
				};

				arr_files.push({
					alt_name: new_file.alt_name,
					file: new_file.file,
					id: new_file.id,
					href: new_file.href,
					url: URL.createObjectURL(new_file.file),
				});
			}
		}

		setNewFiles(newFiles.concat(...arr_files));
	};

	const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		const files = event.dataTransfer.files;
		if (!files) return;

		const arr_files: NewFile[] = [];

		for (const file of files) {
			if (file.size > 50 * 1024 * 1024) {
				Alert(
					'Atenção',
					`O arquivo selecionado ultrapassa o tamanho máximo permitido. \n
				Tamanho atual: '${(file.size / (1024 * 1024)).toFixed(0)} MB',
				\n Reduza para menos que '50 MB'`,
					'warning',
				);
				continue;
			}

			if (file.size > 0) {
				const file_alt = file.name;
				const file_id = randomID(12);

				const new_file: NewFile = {
					id: file_id,
					alt_name: file_alt,
					href: formatFileName('temp_sector_name', file_alt),
					file: new File([file], `${file_id}-${clearFileName(file.name)}`, {
						type: file.type,
						lastModified: file.lastModified,
					}),
				};

				arr_files.push({
					alt_name: new_file.alt_name,
					file: new_file.file,
					id: new_file.id,
					href: new_file.href,
					url: URL.createObjectURL(new_file.file),
				});
			}
		}

		setNewFiles(newFiles.concat(...arr_files));
	};

	const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
	};

	const handleSubmit = () => {
		if (!newFiles.length) return;

		if (type === 'simple') {
			for (const simple_file of newFiles) {
				const url = URL.createObjectURL(simple_file.file);
				const name = simple_file.file.name;
				const alt_name = simple_file.alt_name;

				editor
					.chain()
					.focus()
					.extendMarkRange('link')
					.insertContent({
						type: 'text',
						text: alt_name,
						marks: [
							{
								type: 'link',
								attrs: {
									id: simple_file.id,
									title: alt_name,
									target: '_blank',
									download: `.${alt_name}`,
									href: formatFileName('temp_sector_name', name),
								},
							},
						],
					})
					.setLink({
						href: url,
					})
					.focus()
					.run();

				if (newFiles.length > 1) editor.commands.enter();
			}
		} else {
			editor.chain().focus().setFiles(newFiles, type).run();
		}

		for (const item of newFiles) {
			addFile(item.file);
		}

		setOpen(false);
	};

	return (
		<div className='flex flex-col justify-center p-3'>
			<label
				htmlFor='file-input'
				className='my-4 flex justify-center rounded-md border-2 border-dashed border-gray-300'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<Input
					type='file'
					accept='.zip,.7z,.rar,.csv,.odt,.doc,.docx,.pdf,.xlsx,.kml,.kmz'
					multiple
					onChange={handleFileChange}
				/>
			</label>

			<Tabs defaultValue='files'>
				<TabsList className='bg-beige-400/60 flex justify-center font-semibold'>
					<TabsTrigger value='files'>Arquivos Selecionados</TabsTrigger>
					<TabsTrigger value='type'>Estilo de Exibição</TabsTrigger>
				</TabsList>
				<TabsContent value='files'>
					{newFiles.length > 0 ? (
						newFiles.map((item, index) => (
							<div key={item.id} className='flex items-center gap-2 overflow-y-auto'>
								<div className='w-full p-1'>
									<Label className='text-sm font-medium text-gray-700'>Nome do arquivo</Label>
									<Input
										className='w-full rounded-md border border-gray-300 px-4 py-2'
										value={item.alt_name}
										onChange={(e) => {
											const value = e.target.value;

											setNewFiles((prev) =>
												prev.map((file, i) =>
													i === index
														? {
															...file,
															alt_name: value,
														}
														: file,
												),
											);
										}}
									/>
								</div>
								<div className='w-full'>
									<Label className='text-sm font-medium text-gray-700'>Arquivo</Label>
									<Input
										className='w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2'
										type='text'
										value={item.file.name}
										readOnly
									/>
								</div>
								<Button
									variant='destructive'
									onClick={() => {
										setNewFiles((prev) => prev.filter((_, i) => i !== index));
									}}
									className='mb-1 flex self-end rounded bg-slate-400 p-2 text-gray-800'
								>
									<FaTrashAlt />
								</Button>
							</div>
						))
					) : (
						<p className='p-6 text-center text-sm text-gray-700'>Nenhum arquivo selecionado</p>
					)}
				</TabsContent>
				<TabsContent value='type'>
					<Tabs defaultValue='simple' onValueChange={setType}>
						<TabsList className='bg-base-100/60 flex justify-center font-semibold'>
							<TabsTrigger value='simple'>Lista Simples</TabsTrigger>
							<TabsTrigger value='accordion'>Lista Agrupada</TabsTrigger>
							<TabsTrigger value='group'>Itens Agrupados</TabsTrigger>
						</TabsList>
						<div className='font-medium'>Preview:</div>
						<section className='rounded-sm border-2 bg-slate-200 p-2'>
							<TabsContent className='m-0' value='simple'>
								{newFiles.map((item) => (
									<div
										key={item.id}
										className='link overflow-hidden whitespace-nowrap text-blue-600 hover:cursor-pointer'
									>
										{item.alt_name}
									</div>
								))}
							</TabsContent>
							<TabsContent value='accordion'>
								<details open className='border-beige-900/70 h-full border-2'>
									<summary className='bg-beige-500 px-2 py-4 text-left text-sm font-medium text-slate-100 hover:cursor-pointer'>
										Titulo
									</summary>
									<div className='m-2 flex flex-wrap gap-2 overflow-hidden px-2 text-sm'>
										{newFiles.map((item) => (
											<div
												key={item.id}
												className='flex max-w-screen-sm flex-wrap text-ellipsis whitespace-nowrap text-blue-600 hover:cursor-pointer'
											>
												{item.alt_name}
											</div>
										))}
									</div>
								</details>
							</TabsContent>
							<TabsContent value='group'>
								<details open className='border-beige-900/70 h-full border-2'>
									<summary className='bg-beige-500 px-2 py-4 text-left text-sm font-medium text-slate-100 hover:cursor-pointer'>
										Titulo
									</summary>
									<div className='m-2 flex flex-wrap gap-2 overflow-hidden px-2 text-sm'>
										{newFiles.map((item) => (
											<div
												key={item.id}
												className='bg-beige-600 flex max-w-screen-sm flex-wrap rounded-sm p-2 wrap-break-word text-ellipsis whitespace-nowrap text-white hover:cursor-pointer'
											>
												{item.alt_name}
											</div>
										))}
									</div>
								</details>
							</TabsContent>
						</section>
					</Tabs>
				</TabsContent>
			</Tabs>
			<div className='flex justify-end space-x-2 pt-2'>
				<Button onClick={() => setOpen(false)} variant='destructive'>
					Cancelar
				</Button>
				<Button onClick={handleSubmit}>Salvar</Button>
			</div>
		</div>
	);
}
