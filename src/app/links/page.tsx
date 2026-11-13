'use client';

import axios from 'axios';
import { Asterisk, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LINKS, PROFILE, SOCIALS } from '@/lib/profile';
import { ShareButton } from './components/share';

const ICON_SRC: Record<string, string> = {
	instagram: '/icons/instagram.svg',
	youtube: '/icons/youtube.svg',
	linkedin: '/icons/linkedin.svg',
	github: '/icons/github.svg',
};

export default function Links() {
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
						<Asterisk />
					</Button>

					<ShareButton />
				</header>

				<CardContent>
					<div className='mt-10'>
						<div className='flex flex-col items-center gap-4'>
							<Avatar className='size-34'>
								<AvatarImage
									className='aspect-auto object-cover'
									src={PROFILE.avatar || '/placeholder.svg'}
									alt={`Foto de perfil de ${PROFILE.username}`}
								/>
							</Avatar>

							<h1 className='text-xl font-bold tracking-tight'>{PROFILE.username}</h1>

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
										<Image
											src={ICON_SRC[social.key] || '/icons/placeholder.svg'}
											alt={social.label}
											width={24}
											height={24}
											className='text-foreground/80 size-6 brightness-0 dark:invert'
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
									<span className='flex-1 text-center text-sm font-medium text-balance'>
										{link.title}
									</span>

									<MoreVertical className='size-4 text-white opacity-60 transition-opacity group-hover:opacity-100' />
								</Button>
							</a>
						))}
					</div>
				</CardContent>

				<CardFooter className='sm>mt-10 flex flex-col items-center gap-4'>
					<p className='text-muted-foreground text-center text-xs text-pretty dark:text-white/60'>
						Cookie Preferences • Report • Privacy • Explore
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
