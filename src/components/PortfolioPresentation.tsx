'use client';

import { gsap } from 'gsap';
import type Lenis from 'lenis';
import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface PortfolioPresentationProps {
	lenis: Lenis;
}

interface PresentationStop {
	target: string | number;
	label: string;
	duration: number;
	pause: number;
	offset?: number;
	horizontalTrack?: string;
	horizontalItems?: string;
	horizontalDuration?: number;
	verticalItems?: string;
	itemPause?: number;
}

const PRESENTATION_STOPS: PresentationStop[] = [
	{
		target: 0,
		label: 'Apresentação',
		duration: 2,
		pause: 2000,
	},
	{
		target: '#sobre-mim',
		label: 'Sobre mim',
		duration: 2.5,
		pause: 3000,
		offset: -100,
	},
	{
		target: '#projetos',
		label: 'Trabalhos recentes',
		duration: 2.5,
		pause: 3000,
		horizontalTrack: '[data-presentation-track="projetos"]',
		horizontalItems: '[data-presentation-item="projeto"]',
		horizontalDuration: 2.5,
		itemPause: 3500,
	},
	{
		target: '#experiencias',
		label: 'Minhas experiências',
		duration: 2.5,
		pause: 0,
		verticalItems: '[data-presentation-item="experiencia"]',
		itemPause: 1500,
	},
	{
		target: '#certificados',
		label: 'Certificados',
		duration: 2.5,
		pause: 500,
	},
	{
		target: '#quadro',
		label: 'Quadro',
		duration: 2.5,
		pause: 4000,
		offset: -100,
	},
	{
		target: '#contato',
		label: 'Vamos conversar',
		duration: 2.5,
		pause: 2000,
	},
];

const EASING = (value: number) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);

const wait = (duration: number) =>
	new Promise<void>((resolve) => {
		window.setTimeout(resolve, duration);
	});

function scrollHorizontal(track: HTMLElement, item: HTMLElement, duration: number): Promise<void> {
	const targetLeft =
		item.getBoundingClientRect().left -
		track.getBoundingClientRect().left +
		track.scrollLeft -
		(track.clientWidth - item.clientWidth) / 2;

	const maxScroll = track.scrollWidth - track.clientWidth;

	const destination = Math.max(0, Math.min(targetLeft, maxScroll));

	return new Promise((resolve) => {
		gsap.to(track, {
			scrollLeft: destination,
			duration,
			ease: 'power3.inOut',
			overwrite: 'auto',
			onComplete: resolve,
			onInterrupt: resolve,
		});
	});
}

export function PortfolioPresentation({ lenis }: PortfolioPresentationProps) {
	const [isPlaying, setIsPlaying] = useState(false);

	const executionId = useRef(0);

	const clearHorizontalAnimations = useCallback(() => {
		document.querySelectorAll<HTMLElement>('[data-presentation-track]').forEach((track) => {
			gsap.killTweensOf(track);
		});

		document.querySelectorAll<HTMLElement>('[data-presentation-item]').forEach((item) => {
			gsap.killTweensOf(item);

			gsap.set(item, {
				clearProps: 'transform,filter',
			});
		});
	}, []);

	const resetHorizontalTracks = useCallback(() => {
		document.querySelectorAll<HTMLElement>('[data-presentation-track]').forEach((track) => {
			gsap.set(track, {
				scrollLeft: 0,
			});
		});
	}, []);

	const stopPresentation = useCallback(() => {
		executionId.current += 1;

		lenis.scrollTo(window.scrollY, {
			immediate: true,
		});

		clearHorizontalAnimations();

		setIsPlaying(false);
	}, [lenis, clearHorizontalAnimations]);

	const playHorizontalSection = useCallback(
		async (stop: PresentationStop, id: number): Promise<void> => {
			if (!stop.horizontalTrack || !stop.horizontalItems) {
				return;
			}

			const track = document.querySelector<HTMLElement>(stop.horizontalTrack);

			if (!track) {
				console.warn(`[PortfolioPresentation] Container não encontrado: ${stop.horizontalTrack}`);
				return;
			}

			const items = Array.from(track.querySelectorAll<HTMLElement>(stop.horizontalItems));

			if (!items.length) {
				console.warn(`[PortfolioPresentation] Nenhum card encontrado: ${stop.horizontalItems}`);
				return;
			}

			// Começa sempre pelo primeiro card.
			gsap.set(track, {
				scrollLeft: 0,
			});

			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				if (executionId.current !== id) return;

				const item = items[itemIndex];

				// Deslocamento horizontal até o card.
				await scrollHorizontal(track, item, stop.horizontalDuration ?? 1.5);

				if (executionId.current !== id) return;

				await wait(stop.itemPause ?? 3500);

				if (executionId.current !== id) return;
			}
		},
		[],
	);

	const playVerticalSection = useCallback(
		async (stop: PresentationStop, id: number): Promise<void> => {
			if (!stop.verticalItems) return;

			const items = Array.from(document.querySelectorAll<HTMLElement>(stop.verticalItems));

			if (!items.length) {
				console.warn(
					`[PortfolioPresentation] Nenhuma experiência encontrada: ${stop.verticalItems}`,
				);
				return;
			}

			for (const item of items) {
				if (executionId.current !== id) return;

				await new Promise<void>((resolve) => {
					lenis.scrollTo(item, {
						duration: 1.8,
						easing: EASING,
						lock: true,
						offset: -100,
						onComplete: () => resolve(),
					});
				});

				if (executionId.current !== id) return;

				await wait(stop.itemPause ?? 2000);
			}
		},
		[lenis],
	);

	const animateButtonClick = useCallback(async (button: HTMLElement) => {
		await new Promise<void>((resolve) => {
			gsap
				.timeline({ onComplete: resolve })
				.to(button, {
					scale: 0.94,
					y: 3,
					duration: 0.12,
					ease: 'power2.out',
				})
				.to(button, {
					scale: 1,
					y: 0,
					duration: 0.15,
					ease: 'power2.out',
				});
		});

		button.click();
	}, []);

	const startPresentation = useCallback(async () => {
		const id = ++executionId.current;

		clearHorizontalAnimations();
		resetHorizontalTracks();

		setIsPlaying(true);

		for (let index = 0; index < PRESENTATION_STOPS.length; index++) {
			if (executionId.current !== id) return;

			const stop = PRESENTATION_STOPS[index];

			const element =
				typeof stop.target === 'string' ? document.querySelector<HTMLElement>(stop.target) : null;

			if (typeof stop.target === 'string' && !element) {
				console.warn(`[PortfolioPresentation] Seção não encontrada: ${stop.target}`);
				continue;
			}

			// Navegação vertical.
			await new Promise<void>((resolve) => {
				lenis.scrollTo(stop.target, {
					duration: stop.duration,
					easing: EASING,
					lock: true,
					offset: stop.offset ?? 0,
					onComplete: () => resolve(),
				});
			});

			if (executionId.current !== id) return;

			if (stop.horizontalTrack && stop.horizontalItems) {
				await playHorizontalSection(stop, id);
			} else if (stop.verticalItems) {
				await playVerticalSection(stop, id);
			} else {
				await wait(stop.pause);
			}

			if (executionId.current !== id) return;
		}

		const curriculo = document.getElementById('curriculo');

		if (curriculo) {
			await new Promise<void>((resolve) => {
				lenis.scrollTo('#home', {
					duration: 2.5,
					easing: EASING,
					lock: true,
					offset: 0,
					onComplete: () => resolve(),
				});
			});

			await animateButtonClick(curriculo);
		}

		setTimeout(() => {
			const theme = document.getElementById('theme');

			if (theme) {
				animateButtonClick(theme);
			}
		}, 2000);

		if (executionId.current === id) {
			setIsPlaying(false);
		}
	}, [
		lenis,
		clearHorizontalAnimations,
		resetHorizontalTracks,
		playHorizontalSection,
		playVerticalSection,
		animateButtonClick,
	]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === '.') {
				event.preventDefault();

				const button = document.getElementById('presentation');
				if (button) {
					button.click();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className='fixed right-6 bottom-6 z-9999 flex items-center gap-3'>
			<button
				id='presentation'
				type='button'
				onClick={isPlaying ? stopPresentation : startPresentation}
				className='btn btn-primary btn-lg hidden rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_#000] transition-transform hover:-translate-y-1'
			>
				{isPlaying ? (
					<>
						<Pause size={18} />
						Parar apresentação
					</>
				) : (
					<>
						<Play size={18} />
						Apresentar portfólio
					</>
				)}
			</button>
		</div>
	);
}
