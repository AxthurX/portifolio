import type { Editor } from '@tiptap/react';
import { type ChangeEvent, useState } from 'react';
import { usePostContext } from '@/components/TipTap/post-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Alert, clearFileName } from '@/lib/utils';
import { imageUrlAllowed, randomID } from '../../utils';

interface ImageCreateProps {
	editor: Editor;
	close: () => void;
}

export interface NewFile {
	id: string;
	alt_name: string;
	href?: string;
	url?: string;
	file: File;
}

export const ImageCreate = ({ editor, close }: ImageCreateProps) => {
	const [newFile, setNewFile] = useState<NewFile | null>(null);
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [link, setLink] = useState<string>('');
	const { addFile } = usePostContext();

	const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files?.length) return;

		for (const file of files) {
			if (file.type === 'image/svg+xml') {
				Alert('Atenção', 'Imagens do tipo SVG não são permitidas.', 'warning');

				continue;
			}

			if (file.size > 10 * 1024 * 1024) {
				Alert(
					'Atenção',
					`A Imagem selecionada ultrapassa o tamanho máximo permitido. \n Tamanho atual: '${(
						file.size / (1024 * 1024)
					).toFixed(0)} MB', \n Reduza para menos que '10 MB'`,
					'warning',
				);

				continue;
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
		}
	};

	const handleSubmit = () => {
		const image = {
			id: randomID(12),
			url: link,
		};

		if (newFile && image) {
			editor.commands.setImages([{ src: newFile.file, title: description }]);
			addFile(newFile.file);
			close();
		} else if (image && image?.url.length > 5) {
			// Teste a URL com a expressão regular
			const regex = /^https?:\/\/.*\.(png|jpe?g|gif|bmp|tiff|webp|svg)$/i;
			if (!regex.test(image.url) && !image.url.startsWith('/admin')) {
				Alert('Erro', 'URL não é uma imagem', 'destructive');
			} else {
				if (imageUrlAllowed(image.url)) {
					editor.commands.setImages([{ src: image.url, title: description }]);
					close();
				} else {
					Alert('Erro', 'URL não está permitida', 'destructive');
				}
			}
		} else {
			Alert('Erro', 'Não há nada para ser salvo.', 'destructive');
		}
	};

	return (
		<div className='flex flex-col justify-center p-3'>
			<Tabs defaultValue='file'>
				<TabsList className='bg-beige-400/60 flex justify-center font-semibold'>
					<TabsTrigger value='file'>Arquivo</TabsTrigger>
					<TabsTrigger value='url'>Externo</TabsTrigger>
				</TabsList>
				<TabsContent value='file' className='mt-2 flex flex-col justify-center gap-y-2'>
					<Label>Arquivo:</Label>
					<div className='border-beige-500/70 rounded-md border-2 border-dashed'>
						<Input
							type='file'
							accept='image/*'
							multiple={false}
							onChange={handleFile}
							className='border-0'
						/>
					</div>
					<div>
						<Label>Descrição:</Label>
						<Textarea
							rows={4}
							cols={50}
							placeholder='Exemplo'
							className='bg-beige-50 border-2'
							defaultValue={description ? description : ''}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</TabsContent>
				<TabsContent value='url' className='flex flex-col justify-center gap-y-2'>
					<div>
						<Label>URL:</Label>
						<Input
							type='url'
							className='border-2'
							placeholder='https://example.com'
							onChange={(e) => setLink(e.target.value)}
						/>
					</div>

					<div>
						<Label>Descrição:</Label>
						<Textarea
							rows={4}
							cols={50}
							maxLength={200}
							className='border-2'
							placeholder='Exemplo'
							defaultValue={description ? description : ''}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
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

export default ImageCreate;
