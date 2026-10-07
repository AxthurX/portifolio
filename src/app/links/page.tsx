'use client';

import axios from 'axios';
import { Asterisk, MoreVertical, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { LINKS, PROFILE, SOCIALS } from '@/src/lib/profile';

const ICON_SRC: Record<string, string> = {
	instagram: '/icons/instagram.svg',
	youtube: '/icons/youtube.svg',
	linkedin: '/icons/linkedin.svg',
	github: '/icons/github.svg',
};

export default function Links() {
	async function handleShare() {
		const url = window.location.href;

		try {
			if (navigator.share) {
				await navigator.share({
					title: PROFILE.username,
					url,
				});

				return;
			}

			if (navigator.clipboard) {
				await navigator.clipboard.writeText(url);

				console.log('Link copiado!');
				return;
			}

			const input = document.createElement('input');

			input.value = url;
			document.body.appendChild(input);
			input.select();

			document.execCommand('copy');
			input.remove();

			console.log('Link copiado!');
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}

			console.error('Erro ao compartilhar:', error);
		}
	}

	const handleThemeChange = async () => {
		const data_theme = document.documentElement.getAttribute('data-theme') || 'arthur';
		const theme = data_theme === 'arthur' ? 'black' : 'arthur';

		document.documentElement.setAttribute('data-theme', theme);

		await axios.post('/api/theme', { theme });
	};

	return (
		<main className='flex items-center justify-center px-4 py-10'>
			<Card className='flex w-120 max-w-lg flex-col px-6 py-4 max-sm:w-full'>
				<header className='flex items-center justify-between'>
					<Button className='rounded-full' onClick={handleThemeChange}>
						<Asterisk className='text-secondary-foreground' />
					</Button>

					<div className='flex items-center gap-2'>
						<Button aria-label='Compartilhar' className='rounded-full'>
							<Share2 className='size-4' onClick={handleShare} />
						</Button>
					</div>
				</header>

				<CardContent>
					<div className='mt-10'>
						<div className='flex flex-col items-center gap-4'>
							<Avatar className='size-36'>
								<AvatarImage
									className='aspect-auto object-cover'
									src={PROFILE.avatar || '/placeholder.svg'}
									alt={`Foto de perfil de ${PROFILE.username}`}
								/>
							</Avatar>

							<h1 className='font-bold text-xl tracking-tight'>{PROFILE.username}</h1>

							<nav aria-label='Redes sociais' className='flex items-center justify-center gap-5'>
								{SOCIALS.map((social) => (
									<Link
										key={social.key}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={social.label}
										className='transition-opacity hover:opacity-70'
									>
										{/* brightness-0 invert força o SVG monocromático a ficar branco sobre o fundo escuro */}
										<Image
											src={ICON_SRC[social.key] || '/icons/placeholder.svg'}
											alt={social.label}
											width={24}
											height={24}
											className='size-6 text-foreground/80 brightness-0 dark:invert'
										/>
									</Link>
								))}
							</nav>
						</div>
					</div>

					<div className='mt-10 flex flex-1 flex-col gap-3 pb-6'>
						{LINKS.map((link) => (
							<a key={link.title} href={link.url} target='_blank' rel='noopener noreferrer'>
								<Button className='h-14 w-full'>
									<span className='flex-1 text-balance text-center font-medium text-sm'>
										{link.title}
									</span>

									<MoreVertical className='size-4 text-white opacity-60 transition-opacity group-hover:opacity-100' />
								</Button>
							</a>
						))}
					</div>
				</CardContent>

				<CardFooter className='sm>mt-10 flex flex-col items-center gap-4'>
					<p className='text-pretty text-center text-muted-foreground text-xs dark:text-white/60'>
						Cookie Preferences • Report • Privacy • Explore
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
