'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePinBoard } from '@/hooks/use-pin-board';
import { pinById } from '@/lib/pins';
import { cn } from '../lib/utils';
import { BoardFrame } from './pin/BoardFrame';
import { BoardToolbar } from './pin/BoardToolbar';
import { PinBoard } from './pin/PinBoard';
import { PinBoxSheet } from './pin/PinBoxSheet';
import { PinInspector } from './pin/PinInspector';

gsap.registerPlugin(ScrollTrigger);

type TrophySize = 'large' | 'medium' | 'small' | 'mini';

interface Certificate {
	title: string;
	issuer: string;
	date: string;
	credentialCode?: string;
	credentialUrl?: string;
	skills?: string[];
	image: string;
	size: TrophySize;
	color: 'gold' | 'silver' | 'bronze' | 'teal';
}

const COLOR_MAP = {
	gold: {
		cup: 'text-yellow-400',
		base: 'bg-yellow-400/10 border-yellow-400/30',
		glow: 'shadow-yellow-400/20',
		badge: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
		stem: 'bg-yellow-400/40',
		label: 'text-yellow-300',
	},
	silver: {
		cup: 'text-zinc-300',
		base: 'bg-zinc-300/10 border-zinc-300/30',
		glow: 'shadow-zinc-300/20',
		badge: 'bg-zinc-300/15 text-zinc-200 border-zinc-300/30',
		stem: 'bg-zinc-300/40',
		label: 'text-zinc-300',
	},
	bronze: {
		cup: 'text-orange-400',
		base: 'bg-orange-400/10 border-orange-400/30',
		glow: 'shadow-orange-400/20',
		badge: 'bg-orange-400/15 text-orange-300 border-orange-400/30',
		stem: 'bg-orange-400/40',
		label: 'text-orange-300',
	},
	teal: {
		cup: 'text-teal-400',
		base: 'bg-teal-400/10 border-teal-400/30',
		glow: 'shadow-teal-400/20',
		badge: 'bg-teal-400/15 text-teal-300 border-teal-400/30',
		stem: 'bg-teal-400/40',
		label: 'text-teal-300',
	},
};

const SIZE_CONFIG = {
	large: {
		cupH: 'h-20',
		cupW: 'w-16',
		stemH: 'h-8',
		baseW: 'w-20',
		cardW: 'col-span-2 row-span-2',
		minH: 'min-h-[260px]',
	},
	medium: {
		cupH: 'h-14',
		cupW: 'w-12',
		stemH: 'h-5',
		baseW: 'w-16',
		cardW: 'col-span-1 row-span-2',
		minH: 'min-h-[200px]',
	},
	small: {
		cupH: 'h-10',
		cupW: 'w-9',
		stemH: 'h-4',
		baseW: 'w-12',
		cardW: 'col-span-1 row-span-1',
		minH: 'min-h-[160px]',
	},
	mini: {
		cupH: 'h-7',
		cupW: 'w-7',
		stemH: 'h-3',
		baseW: 'w-10',
		cardW: 'col-span-1 row-span-1',
		minH: 'min-h-[140px]',
	},
};

const CertificateCard = memo(function CertificateCard({
	cert,
	index,
}: {
	cert: Certificate;
	index: number;
}) {
	const c = COLOR_MAP[cert.color];
	const s = SIZE_CONFIG[cert.size];

	const BACKGROUND_STYLE = useMemo(
		() => ({
			backgroundImage: `url(${cert.image})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}),
		[cert.image],
	);

	return (
		<motion.div
			className={`${s.cardW} ${s.minH}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				duration: 0.45,
			}}
		>
			<div
				className={cn(
					'group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300',
					c.base,
				)}
				style={BACKGROUND_STYLE}
			>
				{/* <Image src={`url(${cert.image})`} alt={cert.title} width={300} height={300} /> */}

				{/* Shelf glow top line */}
				{/* <div
					className={`absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-current to-transparent ${c.cup} opacity-30`}
				/> */}

				{/* Info */}
				{/* <div className='mt-3 flex flex-col gap-1'>
					<p
						className={`font-semibold text-foreground leading-tight ${cert.size === 'large' ? 'text-sm' : cert.size === 'mini' ? 'text-[10px]' : 'text-xs'}`}
					>
						{cert.title}
					</p>
					<p
						className={`${c.label} font-medium ${cert.size === 'mini' ? 'text-[9px]' : 'text-[10px]'}`}
					>
						{cert.issuer}
					</p>
					<p className='text-[9px] text-muted-foreground'>{cert.date}</p>

					{cert.skills && cert.size !== 'mini' && (
						<div className='mt-1 flex flex-wrap gap-1'>
							{cert.skills.slice(0, cert.size === 'large' ? 3 : 1).map((skill) => (
								<span
									key={skill}
									className={`rounded-full border px-1.5 py-0.5 font-medium text-[8px] ${c.badge}`}
								>
									{skill}
								</span>
							))}
						</div>
					)}
				</div> */}

				{/* Link icon on hover */}
				{/* {cert.credentialUrl && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						// animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
						transition={{ duration: 0.2 }}
						className='absolute top-3 right-3'
					>
						<a
							href={cert.credentialUrl}
							target='_blank'
							rel='noopener noreferrer'
							className={`flex h-6 w-6 items-center justify-center rounded-full border ${c.badge} transition-colors`}
							onClick={(e) => e.stopPropagation()}
							aria-label={`Ver credencial: ${cert.title}`}
						>
							<ExternalLink size={10} />
						</a>
					</motion.div>
				)} */}
			</div>
		</motion.div>
	);
});

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
			className='relative mt-8 w-full overflow-hidden border-border border-t py-16 md:mt-12 md:py-32'
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
