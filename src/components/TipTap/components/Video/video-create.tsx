'use client';

import type { Editor } from '@tiptap/react';
import { Upload } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';
import { usePostContext } from '@/components/TipTap/post-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, clearFileName, cn } from '@/lib/utils';
import { isValidYoutubeUrl } from '../../extensions/youtube/utils';
import { randomID } from '../../utils';
import type { NewFile } from '../Image/image-create';

interface VideoCreateProps {
	editor: Editor;
	close: () => void;
}

export const VideoCreate = ({ editor, close }: VideoCreateProps) => {
	const file_ref = useRef<HTMLInputElement>(null);

	const [is_dragging, setIsDragging] = useState(false);
	const [url, setUrl] = useState<string>('');
	const [height, setHeight] = useState<number>(480);
	const [width, setWidth] = useState<number>(640);
	const [newFile, setNewFile] = useState<NewFile | null>(null);

	const { addFile } = usePostContext();

	const handleSubmit = () => {
		if (newFile) {
			editor.chain().focus().setVideo({ src: newFile.file, width, height }).run();
			addFile(newFile.file);
		} else if (isValidYoutubeUrl(url)) {
			editor
				.chain()
				.focus()
				.setYoutubeVideo({
					src: url,
					width,
					height,
				})
				.run();
		} else {
			editor.chain().focus().setVideo({ src: url, width, height }).run();
		}

		close();
	};

	const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file || editor.isDestroyed) return;

		if (file.size > 50 * 1024 * 1024) {
			Alert(
				'Atenção',
				`O vídeo selecionada ultrapassa o tamanho máximo permitido. Tamanho atual: '${(file.size / (1024 * 1024)).toFixed(0)} MB', \n Reduza para menos que '50 MB'`,
				'warning',
			);

			return;
		}

		const file_alt = file.name;
		const file_id = randomID(12);

		const new_file: NewFile = {
			id: file_id,
			alt_name: file_alt,
			file: new File([file], `${file_id}-${clearFileName(file.name)}`, {
				type: file.type,
				lastModified: file.lastModified,
			}),
		};

		setNewFile(new_file);
	};

	const handleButtonClick = () => {
		if (file_ref.current) file_ref.current.click();
	};

	const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!is_dragging) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (!files || files.length === 0) return;
		const file = files[0];

		if (file.size > 50 * 1024 * 1024) {
			Alert(
				'Atenção',
				`O vídeo selecionada ultrapassa o tamanho máximo permitido. Tamanho atual: '${(file.size / (1024 * 1024)).toFixed(0)} MB', \n Reduza para menos que '50 MB'`,
				'warning',
			);

			return;
		}

		const file_alt = file.name;
		const file_id = randomID(12);

		const new_file: NewFile = {
			id: file_id,
			alt_name: file_alt,
			file: new File([file], `${file_id}-${clearFileName(file.name)}`, {
				type: file.type,
				lastModified: file.lastModified,
			}),
		};

		setNewFile(new_file);
	};

	return (
		<div className='flex flex-col justify-center p-3'>
			<Tabs defaultValue='geral'>
				<TabsList className='bg-beige-400/60 flex justify-center font-semibold'>
					<TabsTrigger value='geral'>Geral</TabsTrigger>
					<TabsTrigger value='upload'>Upload</TabsTrigger>
				</TabsList>
				<TabsContent value='geral' className='gap-y-2'>
					<div>
						<Label>Endereço</Label>
						<Input
							type='url'
							className='border-2'
							placeholder='https://videos.mp4 ou https://www.youtube.com/watch?v=...'
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<div className='flex gap-1'>
						<div className='w-full'>
							<Label>Largura</Label>
							<Input
								className='border-2'
								defaultValue={width}
								onChange={(e) => setWidth(Number(e.target.value))}
							/>
						</div>
						<div className='w-full'>
							<Label>Altura</Label>
							<Input
								className='border-2'
								defaultValue={height}
								onChange={(e) => setHeight(Number(e.target.value))}
							/>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='upload' className='flex items-center justify-center gap-y-2'>
					<label
						htmlFor='file-upload'
						onDragEnter={handleDragEnter}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						className={cn('m-4 flex flex-col items-center justify-center space-y-4 text-center', {
							'border-primary border-[3px] border-dashed bg-gray-800/10 p-6': is_dragging,
						})}
					>
						<div className='flex flex-col items-center justify-center space-y-3 text-center'>
							<div className='bg-primary rounded-full p-4'>
								<Upload className='size-8 text-white' />
							</div>
							<div>
								<h3 className='text-lg font-medium'>Arraste e solte arquivos</h3>
								<p className='text-muted-foreground text-sm'>
									Arraste e solte arquivos aqui ou clique para selecionar arquivos
								</p>
							</div>
							<Button onClick={handleButtonClick} size='sm'>
								Upload de vídeo
							</Button>
							<Input
								ref={file_ref}
								type='file'
								multiple={false}
								accept='video/*'
								onChange={handleFile}
							/>
						</div>
					</label>
				</TabsContent>
			</Tabs>

			<div className='mt-2 flex justify-end space-x-2'>
				<Button onClick={close} variant='destructive'>
					Cancelar
				</Button>
				<Button onClick={handleSubmit}>Salvar</Button>
			</div>
		</div>
	);
};

export default VideoCreate;
