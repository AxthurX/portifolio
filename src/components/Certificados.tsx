'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { memo, type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { loadCertificates } from '../lib/pdf';
import { cn } from '../lib/utils';

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
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const [count, setCount] = useState(5);

	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		async function load() {
			const pdfs = await loadCertificates();

			const colors: Certificate['color'][] = ['gold', 'silver', 'bronze', 'teal'];

			const sizes: TrophySize[] = ['large', 'medium', 'small', 'mini'];

			setCertificates(
				pdfs.map((pdf, index) => ({
					title: pdf.title,
					issuer: '',
					date: '',
					image: pdf.image,
					credentialUrl: pdf.url,
					size: sizes[index % sizes.length],
					color: colors[index % colors.length],
				})),
			);
		}

		load();
	}, []);

	useEffect(() => {
		if (!sectionRef.current || !headingRef.current) return;

		const ctx = gsap.context(
			() => {
				const heading = headingRef.current;
				if (!heading) return;

				const words = heading.innerText.split(' ');
				heading.innerHTML = words
					.map(
						(word) =>
							`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">
							<span class="gsap-cert-word" style="display:inline-block;transform:translateY(110%);">
								${word}&nbsp;
							</span>
						</span>`,
					)
					.join('');

				gsap.to('.gsap-cert-word', {
					y: 0,
					duration: 0.9,
					stagger: 0.05,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						once: true,
					},
				});
			},
			sectionRef as RefObject<HTMLElement>,
		);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='certificados'
			className='relative mt-8 w-full overflow-hidden border-border border-t py-16 md:mt-12 md:py-32'
		>
			<div className='relative z-10 px-4 md:px-0'>
				{/* Header */}
				<div className='mb-12 md:mb-16'>
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest'>
						Conquistas
					</span>
					<h3
						ref={headingRef}
						className='max-w-2xl font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Licenças &amp;{' '}
						<span className='font-normal font-serif text-primary italic'>Certificados</span>
					</h3>
					<p className='mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed md:text-base'>
						Uma vitrine de aprendizado continuo — cada certificado representa uma nova habilidade
						conquistada.
					</p>
				</div>

				<div className='relative mx-auto'>
					<div className='relative rounded-2xl border border-border bg-card/30 p-1 shadow-2xl backdrop-blur-sm'>
						<div className='flex items-center gap-3 rounded-t-xl border-border border-b bg-card/60 px-6 py-3'>
							<div className='ml-auto font-medium text-[10px] text-muted-foreground uppercase tracking-widest'>
								Vitrine de Conquistas
							</div>
						</div>

						{/* Cabinet glass interior */}
						<div className='relative rounded-b-xl bg-linear-to-b from-card/40 to-background/60 p-6'>
							{/* Shelf lines */}
							<div className='pointer-events-none absolute inset-x-6 top-[42%] h-px bg-border/50' />
							<div className='pointer-events-none absolute inset-x-6 top-[72%] h-px bg-border/50' />

							{/* Trophy grid */}
							<div className='grid grid-cols-4 grid-rows-3 gap-3 md:gap-4'>
								{certificates.slice(0, count).map((cert, i) => (
									<CertificateCard key={cert.title} cert={cert} index={i} />
								))}
							</div>

							{count < certificates.length && (
								<div className='mt-8 flex justify-center'>
									<button
										type='button'
										onClick={() => setCount((prev) => prev + 5)}
										className='rounded-lg border border-border bg-card px-6 py-3 font-medium text-sm transition-colors hover:bg-card/80'
									>
										Ver mais
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
