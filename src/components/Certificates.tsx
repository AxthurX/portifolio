/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { type RefObject, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type TrophySize = 'large' | 'medium' | 'small' | 'mini';

interface Certificate {
	title: string;
	issuer: string;
	date: string;
	credentialCode?: string;
	credentialUrl?: string;
	skills?: string[];
	size: TrophySize;
	color: 'gold' | 'silver' | 'bronze' | 'teal';
}

const certificates: Certificate[] = [
	{
		title: 'Google Project Management Professional Certificate',
		issuer: 'Coursera / Google',
		date: 'Abr 2026',
		credentialUrl: '#',
		skills: ['Gestão de Projetos', 'Agile', 'Scrum'],
		size: 'large',
		color: 'gold',
	},
	{
		title: 'Google Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: 'G5LRW5CUFGWH',
		credentialUrl: '#',
		skills: ['Gestão de Projetos'],
		size: 'medium',
		color: 'gold',
	},
	{
		title: 'Google Agile Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: '1GAD79VY6B3P',
		credentialUrl: '#',
		skills: ['Scrum', 'Gestão de Projetos'],
		size: 'medium',
		color: 'silver',
	},
	{
		title: 'Fundamentos de Suporte de TI',
		issuer: 'Google',
		date: 'Jan 2025',
		credentialUrl: '#',
		skills: ['TI', 'Suporte Técnico'],
		size: 'small',
		color: 'bronze',
	},
	{
		title: 'Next.js Advanced Patterns',
		issuer: 'Vercel',
		date: 'Mar 2025',
		credentialUrl: '#',
		skills: ['Next.js', 'React', 'TypeScript'],
		size: 'medium',
		color: 'teal',
	},
	{
		title: 'CSS & Animations Mastery',
		issuer: 'Frontend Masters',
		date: 'Dez 2024',
		credentialUrl: '#',
		skills: ['CSS', 'Animações', 'GSAP'],
		size: 'small',
		color: 'silver',
	},
	{
		title: 'TypeScript Fundamentals',
		issuer: 'Microsoft',
		date: 'Nov 2024',
		credentialUrl: '#',
		size: 'mini',
		color: 'bronze',
	},
	{
		title: 'React Developer Certification',
		issuer: 'Meta',
		date: 'Out 2024',
		credentialUrl: '#',
		skills: ['React', 'Hooks'],
		size: 'small',
		color: 'teal',
	},
	{
		title: 'Node.js & APIs',
		issuer: 'OpenJS Foundation',
		date: 'Set 2024',
		credentialUrl: '#',
		size: 'mini',
		color: 'gold',
	},
];

const colorMap = {
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

const sizeConfig = {
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

function TrophySVG({
	size,
	color,
}: {
	size: TrophySize;
	color: Certificate['color'];
}) {
	const c = colorMap[color];
	const s = sizeConfig[size];

	return (
		<div className='flex flex-col items-center'>
			{/* Cup body */}
			<div className={`relative ${s.cupH} ${s.cupW} ${c.cup}`}>
				<svg
					viewBox='0 0 64 72'
					fill='currentColor'
					className='h-full w-full drop-shadow-lg'
				>
					<title>Trophy</title>
					<path
						d='M4 14 Q0 14 0 22 Q0 30 6 32 L10 30 Q6 28 6 22 Q6 18 8 16 Z'
						opacity='0.7'
					/>
					<path
						d='M60 14 Q64 14 64 22 Q64 30 58 32 L54 30 Q58 28 58 22 Q58 18 56 16 Z'
						opacity='0.7'
					/>
					{/* Main cup */}
					<path d='M8 6 Q8 0 32 0 Q56 0 56 6 L52 42 Q50 52 32 54 Q14 52 12 42 Z' />
					{/* Shine */}
					<path
						d='M14 8 Q16 4 24 3 L22 20 Q16 18 14 8 Z'
						fill='white'
						opacity='0.15'
					/>
					{/* Star or detail for large */}
					{size === 'large' && (
						<path
							d='M32 18 L34 24 L40 24 L35 28 L37 34 L32 30 L27 34 L29 28 L24 24 L30 24 Z'
							fill='white'
							opacity='0.3'
						/>
					)}
				</svg>
			</div>
			{/* Stem */}
			<div className={`${s.stemH} w-2 ${c.stem} rounded-sm`} />
			{/* Base */}
			<div className={`h-2 ${s.baseW} ${c.stem} rounded-sm opacity-80`} />
			<div className={`mt-0.5 h-1.5 w-8 ${c.stem} rounded-sm opacity-50`} />
		</div>
	);
}

function CertificateCard({
	cert,
	index,
}: {
	cert: Certificate;
	index: number;
}) {
	const [hovered, setHovered] = useState(false);
	const c = colorMap[cert.color];
	const s = sizeConfig[cert.size];

	return (
		<motion.div
			className={`${s.cardW} ${s.minH}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.06 }}
		>
			<div
				className={`relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 ${c.base} ${hovered ? `shadow-lg ${c.glow}` : 'shadow-sm'}`}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				{/* Shelf glow top line */}
				<div
					className={`absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-current to-transparent ${c.cup} opacity-30`}
				/>

				{/* Trophy */}
				<div
					className={`flex justify-center transition-transform duration-300 ${hovered ? '-translate-y-1' : ''}`}
				>
					<TrophySVG size={cert.size} color={cert.color} />
				</div>

				{/* Info */}
				<div className='mt-3 flex flex-col gap-1'>
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
							{cert.skills
								.slice(0, cert.size === 'large' ? 3 : 1)
								.map((skill) => (
									<span
										key={skill}
										className={`rounded-full border px-1.5 py-0.5 font-medium text-[8px] ${c.badge}`}
									>
										{skill}
									</span>
								))}
						</div>
					)}
				</div>

				{/* Link icon on hover */}
				{cert.credentialUrl && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
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
				)}
			</div>
		</motion.div>
	);
}

export default function Certificados() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

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
					<span className='mb-4 block font-medium text-primary text-xs uppercase tracking-widest md:mb-6'>
						Conquistas
					</span>
					<h3
						ref={headingRef}
						className='max-w-2xl font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Licencas &amp;{' '}
						<span className='font-normal font-serif text-primary italic'>
							Certificados
						</span>
					</h3>
					<p className='mt-4 max-w-xl text-muted-foreground text-sm leading-relaxed md:text-base'>
						Uma vitrine de aprendizado continuo — cada certificado representa
						uma nova habilidade conquistada.
					</p>
				</div>

				{/* Trophy Cabinet Frame */}
				<div className='relative mx-auto max-w-7xl'>
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
								{certificates.map((cert, i) => (
									<CertificateCard key={cert.title} cert={cert} index={i} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
