'use client';

import axios from 'axios';
import { ArrowLeft, Asterisk, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const STORAGE_PREFIX = 'homehub:';

function greetingFor(hour: number) {
	if (hour < 6) return 'Boa madrugada';
	if (hour < 12) return 'Bom dia';
	if (hour < 18) return 'Boa tarde';
	return 'Boa noite';
}

export function DashboardHeader() {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());

		const interval = window.setInterval(() => setNow(new Date()), 60_000);

		return () => window.clearInterval(interval);
	}, []);

	const handleThemeChange = async () => {
		const current = document.documentElement.getAttribute('data-theme') || 'arthur';
		const theme = current === 'arthur' ? 'black' : 'arthur';

		document.documentElement.setAttribute('data-theme', theme);

		await axios.post('/api/theme', { theme });
	};

	const handleReset = () => {
		const confirmed = window.confirm(
			'Isso apaga tarefas, despesas, eventos, refeições, inventário e dispositivos salvos neste navegador. Continuar?',
		);

		if (!confirmed) return;

		for (const key of Object.keys(window.localStorage)) {
			if (key.startsWith(STORAGE_PREFIX)) window.localStorage.removeItem(key);
		}

		window.location.reload();
	};

	return (
		<header className='bg-base-100/85 sticky top-0 z-50 w-full border-b-2 border-black backdrop-blur-xl dark:border-white'>
			<div className='mx-auto flex h-16 w-full max-w-430 items-center gap-3 px-4 md:h-20 md:px-8 lg:px-12'>
				<Link
					href='/'
					className='rounded-base bg-primary text-primary-content shadow-light hover:bg-accent active:translate-x-boxShadowX active:translate-y-boxShadowY dark:shadow-dark flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black text-xs font-bold transition-all active:shadow-none dark:border-white'
					title='Voltar ao portfólio'
					aria-label='Voltar ao portfólio'
				>
					AM
				</Link>

				<div className='min-w-0'>
					<p className='text-primary truncate text-xs font-medium tracking-widest uppercase'>
						{now ? greetingFor(now.getHours()) : 'Olá'}
					</p>
					<h1 className='truncate text-lg font-bold tracking-tight md:text-xl'>Arthur Martins</h1>
					<p className='text-muted-foreground hidden truncate text-xs capitalize md:block'>
						{now
							? now.toLocaleDateString('pt-BR', {
									weekday: 'long',
									day: '2-digit',
									month: 'long',
								})
							: 'Home Hub'}
					</p>
				</div>

				<div className='ml-auto flex items-center gap-2'>
					<Button
						variant='outline'
						size='icon'
						onClick={handleReset}
						title='Limpar dados salvos'
						aria-label='Limpar dados salvos'
						className='rounded-base bg-base-100 h-9 w-9 border-black dark:border-white'
					>
						<RotateCcw className='h-4 w-4' />
					</Button>

					<Button
						variant='outline'
						size='icon'
						onClick={handleThemeChange}
						title='Alternar tema'
						aria-label='Alternar tema'
						className='rounded-base bg-base-100 h-9 w-9 border-black dark:border-white'
					>
						<Asterisk className='h-4 w-4' />
					</Button>

					<Button asChild size='sm' className='rounded-base h-9 gap-2 px-3 md:px-4'>
						<Link href='/'>
							<ArrowLeft className='h-4 w-4' />
							<span className='hidden md:inline'>Portfólio</span>
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
