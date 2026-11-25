'use client';

import { type NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { ChevronLeft, ChevronRight, Fullscreen } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type MouseEvent, type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { Alert, cn, formatFileName } from '@/lib/utils';
import type { GalleryImage } from '../../components/Gallery/gallery-create';
import { MAX_IMAGE_SIZE, validateFileSize } from '../../hooks/extensions';
import { useEditableEditor } from '../../store/store';
import { blobUrlToBase64, safeParse } from '../../utils';
import { ImageResize } from '../image/components/resize-handle';
import { useDragResize } from '../image/hooks/use-drag-resize';

export const GalleryComponent = ({ node, editor, selected, updateAttributes }: NodeViewProps) => {
	const { gallery, width, height } = node.attrs as {
		gallery: GalleryImage[];
		width: string;
		height: string;
	};

	const disabled = useEditableEditor();

	const pathname = usePathname();

	const read_only = pathname === '/home';

	const imageRef = useRef<HTMLImageElement>(null);

	const [startX, setStartX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const attrWidth = safeParse(width ?? 1100);
	const attrHeight = safeParse(height ?? 800);

	const { currentWidth, initiateResize, isResizing } = useDragResize({
		editor,
		initialWidth: attrWidth ?? 1100,
		initialHeight: attrHeight ?? 800,
		onDimensionsChange: (dims) => {
			updateAttributes({
				width: Math.round(dims.width),
				height: Math.round(dims.height),
			});
		},
	});

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

	const handleFullscreen = async () => {
		try {
			if (document.fullscreenElement) {
				await document.exitFullscreen();
				return;
			}

			await imageRef.current?.requestFullscreen();
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpload = useCallback(async () => {
		const has_blob = gallery.some((image) => image.url.startsWith('blob:'));
		if (!has_blob) return;

		setIsUploading(true);

		const processedGallery = await Promise.all(
			gallery.map(async (image) => {
				if (!image.url.startsWith('blob:')) return image;

				try {
					const blob = await fetch(image.url).then((res) => res.blob());

					const file = new File([blob], image.fileName ?? image.file.name, {
						type: blob.type,
					});

					if (!validateFileSize(file, MAX_IMAGE_SIZE, 'imagem')) return;

					const id = file.name.split('-')[0];
					const base64 = await blobUrlToBase64(image.url);

					return {
						...image,
						id: id,
						src: formatFileName('temp_sector_name', file.name),
						url: base64,
					};
				} catch (error) {
					console.error(error);
					Alert('Erro', `Falha no upload da imagem: ${error}`, 'destructive');
					return image;
				}
			}),
		);

		updateAttributes({ gallery: processedGallery });

		setIsUploading(false);
	}, [gallery, updateAttributes]);

	useEffect(() => {
		handleUpload();
	}, [handleUpload]);

	return (
		<NodeViewWrapper
			className={cn('gallery-container h-fit object-contain', read_only && 'max-w-fit')}
			style={{
				width: currentWidth,
			}}
		>
			{isUploading ? (
				<div className='flex h-50 w-full items-center justify-center'>
					<Spinner className='size-6' />
				</div>
			) : (
				<div>
					{gallery.length ? (
						<div
							datatype='gallery'
							className='group/node-gallery group gallery-container border-beige-600/10 md:border-x-sage-200 relative my-4 flex aspect-37/20 w-full flex-row rounded-md border-2 max-md:flex-col-reverse md:border-x'
						>
							<div className='max-md:inline-flex max-md:gap-0'>
								<div
									className='mr-2 grid cursor-pointer grid-cols-2 gap-1 overflow-y-auto'
									style={{
										maxHeight: '-webkit-fill-available',
									}}
								>
									{gallery.map((image, index) => (
										<Image
											key={`${image.id}-${image.fileName}`}
											quality={75}
											height={98}
											width={98}
											src={encodeURI(image.url)}
											onClick={() => {
												setCurrentIndex(index);
											}}
											className={cn('aspect-square object-cover', {
												'border-beige-400 rounded border-2 opacity-80 shadow':
													index === currentIndex,
											})}
											alt={`Miniatura da imagem número ${index + 1}`}
										/>
									))}
								</div>
							</div>
							{/* Foto principal */}
							<div className='relative aspect-3/2 bg-black'>
								<Image
									ref={imageRef}
									alt='Imagem atual da galeria.'
									className='aspect-3/2 cursor-auto object-scale-down'
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
								<button
									type='button'
									onClick={handleFullscreen}
									className='fade-in animate-in bg-opacity-50 absolute right-4 bottom-4 transform rounded-full bg-white p-1.5 opacity-0 transition duration-500 group-hover:opacity-100 md:hidden'
								>
									<Fullscreen size={16} />
								</button>
							</div>

							{disabled && selected && (
								<ImageResize
									editor={editor}
									isSelected={selected}
									isResizing={isResizing}
									onPointerDown={initiateResize}
								/>
							)}
						</div>
					) : null}
				</div>
			)}
		</NodeViewWrapper>
	);
};
