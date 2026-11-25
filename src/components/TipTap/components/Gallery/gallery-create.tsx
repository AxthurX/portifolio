'use client';

import type { Editor } from '@tiptap/core';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { type MouseEvent, type TouchEvent, useRef, useState } from 'react';
import { usePostContext } from '@/components/TipTap/post-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, clearFileName, cn } from '@/lib/utils';
import { randomID } from '../../utils';
import type { NewFile } from '../Image/image-create';

export interface GalleryImage {
	id: string;
	file: File;
	url: string;
	src?: string | File;
	fileName?: string;
}

export const GalleryCreate = ({ editor, close }: { editor: Editor; close: () => void }) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [gallery, setGallery] = useState<Array<GalleryImage>>([]);
	const [selected_files, setSelectedFiles] = useState<NewFile[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [startX, setStartX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const { addFile } = usePostContext();

	const onTouchStart = (e: TouchEvent<HTMLImageElement>) => {
		setStartX(e.touches[0].clientX);
	};

	const onTouchEnd = (e: TouchEvent<HTMLImageElement>) => {
		const endX = e.changedTouches[0].clientX;
		if (gallery && startX - endX > 60) {
			setCurrentIndex((currentIndex + 1) % gallery.length);
		} else if (gallery && endX - startX > 60) {
			setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
		}
	};

	const onMouseDown = (e: MouseEvent<HTMLImageElement>) => {
		setStartX(e.clientX);
		setIsDragging(true);
	};

	const onMouseMove = (e: MouseEvent<HTMLImageElement>) => {
		if (!isDragging) return;
		e.preventDefault();
	};

	const onMouseUp = (e: MouseEvent<HTMLImageElement>) => {
		if (!isDragging) return;
		const endX = e.clientX;
		if (gallery && startX - endX > 100) {
			setCurrentIndex((currentIndex + 1) % gallery.length);
		} else if (gallery && endX - startX > 100) {
			setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
		}
		setIsDragging(false);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files) {
			const arr_files: NewFile[] = [];

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

				if (file.size > 0) {
					const file_alt = `${file.name}`;
					const file_id = randomID(12);

					const new_file: NewFile = {
						id: file_id,
						alt_name: file_alt,
						file: new File([file], `${file_id}-${clearFileName(file.name)}`, {
							type: file.type,
							lastModified: file.lastModified,
						}),
					};

					setGallery((prev) => [
						...prev,
						{
							id: new_file.id,
							file: new_file.file,
							url: URL.createObjectURL(file),
						},
					]);

					arr_files.push(new_file);
				}
			}

			setSelectedFiles(selected_files.concat(...arr_files));
			return arr_files;
		}
	};

	const handleSubmit = async () => {
		if (gallery.length) {
			editor.commands.setGallery(gallery);

			for (const file of selected_files) {
				addFile(file.file);
			}

			close();
		}
	};

	const handleRemoveImage = (image_id: string) => {
		setGallery(gallery.filter((item) => item.id !== image_id));
	};

	return (
		<div className='flex flex-col justify-center p-3'>
			<div className='mt-4 rounded-md border-2 border-dashed border-gray-300'>
				<div className='space-y-1 text-center'>
					<Input type='file' multiple={true} accept='image/*' onChange={handleFileChange} />
				</div>
			</div>

			<div className='my-4 min-h-20'>
				{gallery.length ? (
					<div
						datatype='gallery'
						className='group/node-gallery group gallery-container border-beige-600/10 md:border-x-sage-200 flex aspect-37/20 w-full flex-row rounded-md border-2 p-1 max-md:flex-col-reverse md:border-x'
					>
						<div className='max-md:inline-flex max-md:gap-0'>
							<div
								className='mr-2 grid cursor-pointer grid-cols-2 gap-1 overflow-y-auto'
								style={{
									maxHeight: '-webkit-fill-available',
								}}
							>
								{gallery.map((image, index) => (
									<div key={image.id} className='relative'>
										<Image
											quality={75}
											height={98}
											width={98}
											src={encodeURI(image.url)}
											onClick={() => setCurrentIndex(index)}
											className={cn('aspect-square object-cover', {
												'border-beige-400 rounded border-2 opacity-80 shadow':
													index === currentIndex,
											})}
											alt={`Miniatura da imagem número ${index + 1}`}
										/>
										<X
											className='hover:text-error/60 absolute top-0 right-0 m-0.5 size-4 cursor-pointer transition-colors duration-300'
											onClick={() => handleRemoveImage(image.id)}
										/>
									</div>
								))}
							</div>
						</div>
						{/* Foto principal */}
						<div className='relative aspect-3/2 bg-black'>
							<Image
								ref={imageRef}
								alt='Imagem atual da galeria.'
								className='aspect-3/2 object-scale-down'
								quality={75}
								width={900}
								height={600}
								src={encodeURI(gallery[currentIndex].url)}
								onTouchStart={onTouchStart}
								onTouchEnd={onTouchEnd}
								onMouseDown={onMouseDown}
								onMouseMove={onMouseMove}
								onMouseUp={onMouseUp}
							/>
							<button
								type='button'
								onClick={() => {
									setCurrentIndex(currentIndex + -1 < 0 ? gallery.length - 1 : currentIndex - 1);
								}}
								className='fade-in animate-in bg-opacity-50 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-0 transition duration-500 group-hover:opacity-100 max-md:p-1.5'
							>
								<ChevronLeft size={24} />
							</button>
							<button
								type='button'
								onClick={() => {
									setCurrentIndex(currentIndex + 1 > gallery.length - 1 ? 0 : currentIndex + 1);
								}}
								className='fade-in animate-in bg-opacity-50 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-0 transition duration-500 group-hover:opacity-100 max-md:p-1.5'
							>
								<ChevronRight size={24} />
							</button>
						</div>
					</div>
				) : null}
			</div>

			<div className='flex justify-end space-x-2'>
				<Button onClick={close} variant='destructive'>
					Cancelar
				</Button>
				<Button onClick={handleSubmit}>Salvar</Button>
			</div>
		</div>
	);
};

export default GalleryCreate;
