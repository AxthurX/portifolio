'use client';

import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Socials } from '../lib/util';

interface ShareButtonProps {
	username?: string;
	displayName?: string;
	avatarUrl?: string;
	description?: string;
	trigger?: React.ReactNode;
}

export function ShareButton({
	username = '@arthurmartins.dev',
	displayName = 'arthurmartins.dev',
	avatarUrl,
	description = 'Confira meu portfólio e meus projetos!',
	trigger,
}: ShareButtonProps) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const getUrl = () => window.location.href;

	const shareUrl = (platform: string) => {
		const url = encodeURIComponent(getUrl());
		const text = encodeURIComponent(description);

		const urls: Record<string, string> = {
			x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
			whatsapp: `https://wa.me/?text=${text}%20${url}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
		};

		const target = urls[platform];

		if (target) {
			window.open(target, '_blank', 'noopener,noreferrer');
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(getUrl());
			setCopied(true);
			toast.success('Link copiado com sucesso!');

			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error('Não foi possível copiar o link.');
		}
	};

	const handleNativeShare = async () => {
		if (!navigator.share) {
			await handleCopy();
			return;
		}

		try {
			await navigator.share({
				title: displayName,
				text: description,
				url: getUrl(),
			});
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				toast.error('Não foi possível compartilhar.');
			}
		}
	};

	const socials = Socials(copied, handleCopy, shareUrl, handleNativeShare);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ?? (
					<Button aria-label='Compartilhar' className='cursor-pointer rounded-full'>
						<Share2 className='size-4' />
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className='max-h-[90dvh] max-w-130 gap-0 overflow-hidden rounded-2xl border-black p-0'>
				<DialogHeader className='relative flex flex-row items-center justify-center border-b px-6 py-5'>
					<DialogTitle className='text-base font-semibold'>Compartilhar o portfólio</DialogTitle>
				</DialogHeader>

				<div className='overflow-y-auto'>
					<div className='p-6'>
						<div className='flex min-h-61.25 flex-col items-center justify-center gap-5 rounded-3xl bg-black px-5 py-8 text-center text-white'>
							<div className='size-28 overflow-hidden rounded-full border-2 border-white/10 bg-neutral-800'>
								{avatarUrl ? (
									<div
										role='img'
										aria-label={`Foto de ${displayName}`}
										className='size-full bg-cover bg-center'
										style={{ backgroundImage: `url("${avatarUrl}")` }}
									/>
								) : (
									<div className='flex size-full items-center justify-center text-4xl font-bold'>
										{displayName.charAt(0)}
									</div>
								)}
							</div>

							<div>
								<h3 className='text-xl font-extrabold tracking-tight'>{username}</h3>
								<p className='text-base font-medium text-white/90'>✳ /{displayName}</p>
							</div>
						</div>

						<div className='px-2 pt-6'>
							<div className='flex min-w-max justify-between gap-5'>
								{socials.map(({ name, icon: Icon, color, action }) => (
									<button
										key={name}
										type='button'
										onClick={action}
										className='group flex w-14 cursor-pointer flex-col items-center gap-2'
										aria-label={name}
									>
										<span
											className={`flex size-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${color}`}
										>
											<Icon className='size-5' />
										</span>

										<span className='text-xs font-medium whitespace-nowrap'>{name}</span>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className='border-t px-6 py-6'>
						<div className='space-y-1'>
							<h4 className='font-semibold'>Compartilhe {displayName}</h4>
							<p className='text-muted-foreground text-sm leading-relaxed'>{description}</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
