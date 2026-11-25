import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function RevistaAbema() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Image
					width={300}
					height={300}
					src='/ext-files/website-icons/POSTER REVISTA ABEMA.png'
					alt='Capa da Revista Abema sobre licenciamento ambiental no Brasil'
					className='shadow-secondary/30 cursor-pointer object-cover transition-all duration-500 hover:scale-101 hover:shadow'
				/>
			</DialogTrigger>

			<DialogContent
				closeButton={false}
				className='border-border/70 bg-foreground h-[min(92vh,900px)] w-[min(1180px,calc(100%-1.5rem))] max-w-none! gap-0 overflow-hidden rounded-2xl p-0 sm:h-[92vh]'
			>
				<DialogTitle className='sr-only'>Revista Abema</DialogTitle>
				<iframe
					className='size-full rounded-lg border-0'
					src='https://online.fliphtml5.com/ddctz/nveq/#p=112'
					title='Leitor da Revista Abema — Licenciamento Ambiental no Brasil'
					seamless
					scrolling='no'
					allow='fullscreen'
					allowFullScreen
				/>
			</DialogContent>
		</Dialog>
	);
}
