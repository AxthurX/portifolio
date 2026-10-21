'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePinBoard } from '@/hooks/use-pin-board';
import { pinById } from '@/lib/pins';
import { BoardFrame } from './pin/BoardFrame';
import { BoardToolbar } from './pin/BoardToolbar';
import { PinBoard } from './pin/PinBoard';
import { PinBoxSheet } from './pin/PinBoxSheet';
import { PinInspector } from './pin/PinInspector';

gsap.registerPlugin(ScrollTrigger);

export default function Certificados() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	const {
		placed,
		count,
		total,
		placePin,
		removePin,
		movePin,
		rotatePin,
		bringToFront,
		organize,
		shuffle,
		reset,
	} = usePinBoard();

	const isMobile = useIsMobile();

	const [boxOpen, setBoxOpen] = useState(false);
	const [gallery, setGallery] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [quadroVisivel, setQuadroVisivel] = useState(false);

	useEffect(() => {
		const alvo = sectionRef.current;
		if (!alvo) return;

		const observer = new IntersectionObserver(
			([entrada]) => setQuadroVisivel(entrada.isIntersecting),
			{ rootMargin: '-20% 0px -20% 0px' },
		);

		observer.observe(alvo);
		return () => observer.disconnect();
	}, []);

	const placedIds = useMemo(() => new Set(placed.map((pin) => pin.id)), [placed]);
	const selectedPin = selectedId ? pinById(selectedId) : undefined;

	useEffect(() => {
		if (selectedId && !placedIds.has(selectedId)) setSelectedId(null);
	}, [placedIds, selectedId]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			setSelectedId(null);
			setGallery(false);
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	const togglePin = (id: string) => {
		if (placedIds.has(id)) {
			removePin(id);
			setSelectedId(null);
			return;
		}
		placePin(id);
	};

	const handleSelect = useCallback((id: string) => {
		setSelectedId((current) => (current === id ? null : id));
	}, []);

	const handleRemove = useCallback(
		(id: string) => {
			removePin(id);
			setSelectedId(null);
		},
		[removePin],
	);

	const handleDeselect = useCallback(() => setSelectedId(null), []);

	return (
		<section
			ref={sectionRef}
			id='certificados'
			className='relative mt-8 w-full overflow-hidden border-black border-t-2 py-16 md:mt-12 md:py-32 dark:border-white'
		>
			<div className='relative z-10 px-4 md:px-0'>
				<div className='mb-12 md:mb-16'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest dark:text-base-content/70'>
						Conquistas
					</span>
					<h3
						ref={headingRef}
						className='max-w-2xl font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Licenças &amp;{' '}
						<span className='font-normal font-serif text-primary italic dark:text-base-content/70'>
							Certificados
						</span>
					</h3>
					<p className='mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed md:text-base'>
						Uma foto emoldurada de cada curso concluído — arraste, gire e monte a sua coleção.
					</p>
				</div>

				<BoardFrame
					count={count}
					total={total}
					gallery={gallery}
					className='min-h-120 sm:min-h-200'
				>
					<PinBoard
						placed={placed}
						selectedId={selectedId}
						isMobile={isMobile}
						onMove={movePin}
						onBringToFront={bringToFront}
						onSelect={handleSelect}
						onRemove={handleRemove}
						onOpenBox={() => setBoxOpen(true)}
						onDeselect={handleDeselect}
					/>
				</BoardFrame>
			</div>

			{selectedPin && placedIds.has(selectedPin.id) && (
				<PinInspector
					pin={selectedPin}
					onClose={() => setSelectedId(null)}
					onRotate={(delta) => rotatePin(selectedPin.id, delta)}
					onRemove={() => {
						removePin(selectedPin.id);
						setSelectedId(null);
					}}
				/>
			)}

			<BoardToolbar
				boxCount={total - count}
				gallery={gallery}
				visivel={quadroVisivel}
				onOpenBox={() => setBoxOpen(true)}
				onOrganize={organize}
				onShuffle={shuffle}
				onToggleGallery={() => setGallery((value) => !value)}
			/>

			<PinBoxSheet
				open={boxOpen}
				onOpenChange={setBoxOpen}
				placedIds={placedIds}
				count={count}
				total={total}
				onToggle={togglePin}
				onReset={reset}
			/>
		</section>
	);
}
