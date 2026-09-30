import { Asterisk, MoreVertical, Share2 } from 'lucide-react';
import Image from 'next/image';
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
	function handleShare() {
		if (typeof navigator !== 'undefined' && navigator.share) {
			navigator.share({ title: PROFILE.username, url: window.location.href }).catch(() => {});
		} else if (typeof navigator !== 'undefined') {
			navigator.clipboard?.writeText(window.location.href);
		}
	}

	return (
		<main className='flex items-center justify-center px-4 py-6'>
			<Card className='flex w-full max-w-xl flex-col px-6 py-4'>
				<header className='flex items-center justify-between'>
					<Button aria-label='Menu' className='rounded-full'>
						<Asterisk className='text-secondary-foreground' />
					</Button>

					<div className='flex items-center gap-2'>
						<Button
							// onClick={handleShare}
							aria-label='Compartilhar'
							className='rounded-full'
						>
							<Share2 className='size-4' />
						</Button>
					</div>
				</header>

				<CardContent>
					<div className='mt-10'>
						<div className='flex flex-col items-center gap-4'>
							<Avatar className='size-32'>
								<AvatarImage
									src={PROFILE.avatar || '/placeholder.svg'}
									alt={`Foto de perfil de ${PROFILE.username}`}
								/>
							</Avatar>

							<h1 className='font-bold text-xl tracking-tight'>{PROFILE.username}</h1>

							<nav aria-label='Redes sociais' className='flex items-center justify-center gap-5'>
								{SOCIALS.map((social) => (
									<a
										key={social.key}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={social.label}
										className='text-foreground/80 transition-opacity hover:opacity-70'
									>
										{/* brightness-0 invert força o SVG monocromático a ficar branco sobre o fundo escuro */}
										<Image
											src={ICON_SRC[social.key] || '/placeholder.svg'}
											alt={social.label}
											width={24}
											height={24}
											className='size-6 brightness-0'
										/>
									</a>
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

				<CardFooter className='mt-10 flex flex-col items-center gap-4'>
					<p className='text-pretty text-center text-muted-foreground text-xs'>
						Cookie Preferences • Report • Privacy • Explore
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
