import { Bell, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';

export function DashboardHeader() {
	return (
		<header className='sticky top-0 z-10 flex h-20 items-center gap-4 border-white/10 border-b bg-white/5 px-4 backdrop-blur-md md:px-6'>
			<div className='flex items-center gap-3'>
				<div className='relative h-10 w-10 overflow-hidden rounded-full border border-white/20'>
					<Image
						src='/placeholder.svg?height=100&width=100'
						alt='User avatar'
						width={40}
						height={40}
						className='object-cover'
					/>
				</div>
				<div>
					<p className='text-lime-400 text-xs'>Good Morning</p>
					<h1 className='font-semibold text-white text-xl'>HomeHub</h1>
				</div>
			</div>
			<div className='ml-auto flex items-center gap-3'>
				<div className='relative hidden sm:block'>
					<Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<input
						type='text'
						placeholder='Search...'
						className='h-10 w-full rounded-full bg-white/10 pr-4 pl-10 text-sm text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-lime-400/50 md:w-60'
					/>
				</div>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full bg-white/10 text-white hover:bg-white/20'
				>
					<Bell className='h-5 w-5' />
					<span className='sr-only'>Notifications</span>
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full bg-white/10 text-white hover:bg-white/20'
				>
					<Settings className='h-5 w-5' />
					<span className='sr-only'>Settings</span>
				</Button>
			</div>
		</header>
	);
}
