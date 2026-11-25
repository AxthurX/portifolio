'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useAccessibility } from '../accessibility/components/accessibility-context';

export function SnailPointer() {
	const { isMenuOpen, toggleMenu, settings } = useAccessibility();
	const reduceMotion = useReducedMotion();
	const position = settings.position === 'left' ? 'left' : 'right';

	if (isMenuOpen) return null;

	return (
		<motion.button
			type='button'
			onClick={() => toggleMenu(true)}
			aria-label='Abrir menu de acessibilidade'
			title='Menu de acessibilidade (Ctrl + U)'
			initial={false}
			animate={reduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
			transition={
				reduceMotion
					? { duration: 0 }
					: { duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
			}
			className='text-primary focus-visible:ring-primary fixed bottom-5 z-40 hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none md:block'
			style={{
				[position]: '0.9rem',
				['--snail-tilt' as string]: position === 'right' ? '14deg' : '-14deg',
			}}
		>
			<motion.svg
				width='64'
				height='104'
				viewBox='0 0 64 104'
				fill='none'
				aria-hidden
				style={{ rotate: 'var(--snail-tilt)' }}
				className='drop-shadow-[0_3px_0_rgba(0,0,0,0.35)]'
			>
				<path d='M32 20v30' stroke='currentColor' strokeWidth='6' strokeLinecap='round' />

				<path
					d='M32 6 16 26h32L32 6Z'
					fill='currentColor'
					stroke='black'
					strokeWidth='3'
					strokeLinejoin='round'
					className='dark:stroke-white'
				/>

				<path
					d='M12 90c0-8 6-14 14-14h12c8 0 14 6 14 14 0 4-2 6-6 6H18c-4 0-6-2-6-6Z'
					fill='currentColor'
					stroke='black'
					strokeWidth='3'
					strokeLinejoin='round'
					className='dark:stroke-white'
				/>

				<path
					d='M10 96c2-3 6-4 10-2'
					stroke='black'
					strokeWidth='3'
					strokeLinecap='round'
					className='dark:stroke-white'
				/>

				<path
					d='M22 76c-2-4-6-6-8-3M42 76c2-4 6-6 8-3'
					stroke='black'
					strokeWidth='3'
					strokeLinecap='round'
					className='dark:stroke-white'
				/>
				<circle cx='13' cy='72' r='2.4' fill='black' className='dark:fill-white' />
				<circle cx='51' cy='72' r='2.4' fill='black' className='dark:fill-white' />

				<circle
					cx='32'
					cy='78'
					r='13'
					fill='currentColor'
					stroke='black'
					strokeWidth='3'
					className='dark:stroke-white'
				/>
				<path
					d='M32 90c-6 0-11-4-11-9 0-6 5-10 11-10s10 4 10 9c0 5-4 8-9 8-4 0-6-2-6-5 0-3 2-5 5-5'
					stroke='black'
					strokeWidth='2.4'
					strokeLinecap='round'
					fill='none'
					className='dark:stroke-white'
				/>
			</motion.svg>
		</motion.button>
	);
}
