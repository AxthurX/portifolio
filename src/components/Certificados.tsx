'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BadgeCheck, ExternalLink, Medal, Shield, Star } from 'lucide-react';
import { type RefObject, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type ItemType = 'badge' | 'certificate' | 'medal' | 'patch';
type ItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface CertificateItem {
	id: string;
	title: string;
	issuer: string;
	date: string;
	credentialCode?: string;
	credentialUrl?: string;
	skills?: string[];
	type: ItemType;
	size: ItemSize;
	color: 'gold' | 'silver' | 'blue' | 'green' | 'purple';
	gridArea?: string;
}

const certificates: CertificateItem[] = [
	// --- Certificados grandes (centro do quadro) ---
	{
		id: 'c1',
		title: 'Google Project Management Professional Certificate',
		issuer: 'Coursera / Google',
		date: 'Abr 2026',
		credentialCode: 'PM-PROF-2026',
		credentialUrl: '#',
		skills: ['Gestão de Projetos', 'Agile', 'Scrum'],
		type: 'certificate',
		size: 'xl',
		color: 'gold',
	},
	{
		id: 'c2',
		title: 'Google Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: 'G5LRW5CUFGWH',
		credentialUrl: '#',
		skills: ['Gestão de Projetos', 'Planejamento'],
		type: 'certificate',
		size: 'lg',
		color: 'gold',
	},
	{
		id: 'c3',
		title: 'Foundations of Project Management',
		issuer: 'Google',
		date: 'Jul 2025',
		credentialCode: 'FNDPM-2025',
		credentialUrl: '#',
		skills: ['Fundamentos', 'Stakeholders'],
		type: 'certificate',
		size: 'lg',
		color: 'silver',
	},
	{
		id: 'c4',
		title: 'Google Agile Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: '1GAD79VY6B3P',
		credentialUrl: '#',
		skills: ['Scrum', 'Kanban', 'Sprint'],
		type: 'certificate',
		size: 'lg',
		color: 'blue',
	},
	{
		id: 'c5',
		title: 'Capstone: Applying Project Management in the Real World',
		issuer: 'Google',
		date: 'Set 2025',
		credentialCode: 'CAPSTONE-2025',
		credentialUrl: '#',
		skills: ['Case Real', 'Portfolio'],
		type: 'certificate',
		size: 'lg',
		color: 'green',
	},
	{
		id: 'c6',
		title: 'Fundamentos de Suporte de TI',
		issuer: 'Google',
		date: 'Jan 2025',
		credentialCode: 'IT-FUND-2025',
		credentialUrl: '#',
		skills: ['TI', 'Suporte', 'Redes'],
		type: 'certificate',
		size: 'md',
		color: 'blue',
	},
	// --- Badges (pequenos, laterais) ---
	{
		id: 'b1',
		title: 'Google Agile',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'md',
		color: 'blue',
	},
	{
		id: 'b2',
		title: 'Scrum Master',
		issuer: 'Scrum.org',
		date: 'Jun 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'sm',
		color: 'green',
	},
	{
		id: 'b3',
		title: 'TypeScript',
		issuer: 'Microsoft',
		date: 'Nov 2024',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'blue',
	},
	{
		id: 'b4',
		title: 'Node.js',
		issuer: 'OpenJS',
		date: 'Set 2024',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'green',
	},
	{
		id: 'b5',
		title: 'Git & GitHub',
		issuer: 'GitHub',
		date: 'Out 2024',
		credentialUrl: '#',
		type: 'badge',
		size: 'sm',
		color: 'silver',
	},
	{
		id: 'b6',
		title: 'Docker Essentials',
		issuer: 'Docker',
		date: 'Fev 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'blue',
	},
	{
		id: 'b7',
		title: 'SQL Avançado',
		issuer: 'Oracle',
		date: 'Mar 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'sm',
		color: 'gold',
	},
	{
		id: 'b8',
		title: 'AWS Cloud Practitioner',
		issuer: 'Amazon',
		date: 'Abr 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'md',
		color: 'gold',
	},
	{
		id: 'b9',
		title: 'Linux Essentials',
		issuer: 'LPI',
		date: 'Mai 2025',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'silver',
	},
	// --- Medalhas ---
	{
		id: 'm1',
		title: 'Next.js Advanced',
		issuer: 'Vercel',
		date: 'Mar 2025',
		credentialUrl: '#',
		skills: ['Next.js', 'React'],
		type: 'medal',
		size: 'md',
		color: 'silver',
	},
	{
		id: 'm2',
		title: 'React Developer',
		issuer: 'Meta',
		date: 'Out 2024',
		credentialUrl: '#',
		type: 'medal',
		size: 'sm',
		color: 'blue',
	},
	{
		id: 'm3',
		title: 'UX Design',
		issuer: 'Google',
		date: 'Dez 2024',
		credentialUrl: '#',
		type: 'medal',
		size: 'sm',
		color: 'purple',
	},
	{
		id: 'm4',
		title: 'Agilidade Digital',
		issuer: 'FIAP',
		date: 'Jan 2026',
		credentialUrl: '#',
		type: 'medal',
		size: 'md',
		color: 'gold',
	},
	// --- Patches ---
	{
		id: 'p1',
		title: 'CSS & Animations',
		issuer: 'Frontend Masters',
		date: 'Dez 2024',
		credentialUrl: '#',
		type: 'patch',
		size: 'sm',
		color: 'purple',
	},
	{
		id: 'p2',
		title: 'UI/UX Designer',
		issuer: 'Origamid',
		date: 'Fev 2025',
		credentialUrl: '#',
		type: 'patch',
		size: 'sm',
		color: 'blue',
	},
	{
		id: 'p3',
		title: 'Web Acessibilidade',
		issuer: 'W3C',
		date: 'Mar 2025',
		credentialUrl: '#',
		type: 'patch',
		size: 'sm',
		color: 'green',
	},
	{
		id: 'p4',
		title: 'Python Básico',
		issuer: 'DIO',
		date: 'Abr 2025',
		credentialUrl: '#',
		type: 'patch',
		size: 'sm',
		color: 'gold',
	},
	{
		id: 'p5',
		title: 'Segurança em TI',
		issuer: 'Cisco',
		date: 'Jun 2025',
		credentialUrl: '#',
		type: 'patch',
		size: 'sm',
		color: 'silver',
	},
];

const colorSchemes = {
	gold: {
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/40',
		text: 'text-amber-400',
		glow: 'shadow-amber-500/20',
		ribbon: 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600',
		accent: '#f59e0b',
	},
	silver: {
		bg: 'bg-zinc-400/10',
		border: 'border-zinc-400/40',
		text: 'text-zinc-300',
		glow: 'shadow-zinc-400/20',
		ribbon: 'bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500',
		accent: '#a1a1aa',
	},
	blue: {
		bg: 'bg-blue-500/10',
		border: 'border-blue-500/40',
		text: 'text-blue-400',
		glow: 'shadow-blue-500/20',
		ribbon: 'bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600',
		accent: '#3b82f6',
	},
	green: {
		bg: 'bg-emerald-500/10',
		border: 'border-emerald-500/40',
		text: 'text-emerald-400',
		glow: 'shadow-emerald-500/20',
		ribbon: 'bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600',
		accent: '#10b981',
	},
	purple: {
		bg: 'bg-violet-500/10',
		border: 'border-violet-500/40',
		text: 'text-violet-400',
		glow: 'shadow-violet-500/20',
		ribbon: 'bg-gradient-to-r from-violet-600 via-violet-400 to-violet-600',
		accent: '#8b5cf6',
	},
};

// Badge Component - circular/shield shape
function BadgeItem({ item, index }: { item: CertificateItem; index: number }) {
	const [hovered, setHovered] = useState(false);
	const scheme = colorSchemes[item.color];
	
	const sizeClasses = {
		xs: 'w-16 h-16',
		sm: 'w-20 h-20',
		md: 'w-28 h-28',
		lg: 'w-32 h-32',
		xl: 'w-40 h-40',
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			className="flex flex-col items-center gap-2"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div
				className={`relative ${sizeClasses[item.size]} flex items-center justify-center rounded-full ${scheme.bg} border-2 ${scheme.border} transition-all duration-300 ${hovered ? `shadow-lg ${scheme.glow} scale-110` : ''}`}
			>
				{/* Inner glow ring */}
				<div className={`absolute inset-2 rounded-full border ${scheme.border} opacity-50`} />
				
				{/* Icon */}
				<Shield className={`${scheme.text} ${item.size === 'xs' ? 'w-6 h-6' : item.size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'}`} />
				
				{/* Link on hover */}
				{item.credentialUrl && hovered && (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full ${scheme.bg} border ${scheme.border} ${scheme.text}`}
						aria-label={`Ver credencial: ${item.title}`}
					>
						<ExternalLink size={10} />
					</a>
				)}
			</div>
			
			{/* Label below badge */}
			<div className="text-center max-w-24">
				<p className={`text-[9px] font-semibold ${scheme.text} leading-tight truncate`}>
					{item.title}
				</p>
				<p className="text-[8px] text-zinc-500">{item.issuer}</p>
			</div>
		</motion.div>
	);
}

// Medal Component - ribbon style
function MedalItem({ item, index }: { item: CertificateItem; index: number }) {
	const [hovered, setHovered] = useState(false);
	const scheme = colorSchemes[item.color];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			className="flex flex-col items-center"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Ribbon */}
			<div className={`w-8 h-6 ${scheme.ribbon} clip-ribbon`} />
			
			{/* Medal circle */}
			<div
				className={`relative -mt-1 w-14 h-14 flex items-center justify-center rounded-full ${scheme.bg} border-2 ${scheme.border} transition-all duration-300 ${hovered ? `shadow-lg ${scheme.glow} scale-105` : ''}`}
			>
				<Medal className={`${scheme.text} w-6 h-6`} />
				
				{item.credentialUrl && hovered && (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border ${scheme.border} ${scheme.text}`}
						aria-label={`Ver credencial: ${item.title}`}
					>
						<ExternalLink size={8} />
					</a>
				)}
			</div>
			
			{/* Label */}
			<div className="text-center mt-2 max-w-20">
				<p className={`text-[9px] font-semibold ${scheme.text} leading-tight`}>
					{item.title}
				</p>
				<p className="text-[7px] text-zinc-500">{item.date}</p>
			</div>
		</motion.div>
	);
}

// Patch Component - embroidered style
function PatchItem({ item, index }: { item: CertificateItem; index: number }) {
	const [hovered, setHovered] = useState(false);
	const scheme = colorSchemes[item.color];

	return (
		<motion.div
			initial={{ opacity: 0, rotate: -5 }}
			whileInView={{ opacity: 1, rotate: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			className="flex flex-col items-center"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div
				className={`relative w-20 h-16 flex flex-col items-center justify-center rounded-lg ${scheme.bg} border-2 ${scheme.border} transition-all duration-300 ${hovered ? `shadow-lg ${scheme.glow} scale-105` : ''}`}
				style={{ 
					backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)' 
				}}
			>
				<BadgeCheck className={`${scheme.text} w-6 h-6`} />
				<p className={`text-[8px] font-bold ${scheme.text} mt-1 uppercase tracking-wider`}>
					{item.issuer}
				</p>
				
				{item.credentialUrl && hovered && (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border ${scheme.border} ${scheme.text}`}
						aria-label={`Ver credencial: ${item.title}`}
					>
						<ExternalLink size={8} />
					</a>
				)}
			</div>
			<p className={`text-[9px] font-medium ${scheme.text} mt-1 text-center max-w-20`}>
				{item.title}
			</p>
		</motion.div>
	);
}

// Certificate Component - horizontal document style
function CertificateCard({ item, index }: { item: CertificateItem; index: number }) {
	const [hovered, setHovered] = useState(false);
	const scheme = colorSchemes[item.color];
	
	const sizeClasses = {
		xs: 'w-32 h-20',
		sm: 'w-40 h-24',
		md: 'w-48 h-28',
		lg: 'w-56 h-32',
		xl: 'w-72 h-40',
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			className={`relative ${sizeClasses[item.size]}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{/* Certificate frame */}
			<div
				className={`relative h-full w-full flex flex-col overflow-hidden rounded-sm bg-zinc-900/80 border-2 ${scheme.border} transition-all duration-300 ${hovered ? `shadow-xl ${scheme.glow}` : 'shadow-md'}`}
			>
				{/* Top decorative border */}
				<div className={`h-1.5 w-full ${scheme.ribbon}`} />
				
				{/* Content */}
				<div className="flex-1 p-3 flex flex-col justify-between">
					{/* Header with star */}
					<div className="flex items-start gap-2">
						<Award className={`${scheme.text} w-5 h-5 flex-shrink-0`} />
						<div className="flex-1 min-w-0">
							<p className={`text-[10px] font-bold ${scheme.text} leading-tight line-clamp-2`}>
								{item.title}
							</p>
						</div>
					</div>
					
					{/* Footer info */}
					<div className="mt-auto">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-[9px] text-zinc-400 font-medium">{item.issuer}</p>
								<p className="text-[8px] text-zinc-500">{item.date}</p>
							</div>
							{item.credentialCode && (
								<div className={`px-1.5 py-0.5 rounded text-[7px] ${scheme.bg} ${scheme.text} border ${scheme.border}`}>
									{item.credentialCode.slice(0, 8)}...
								</div>
							)}
						</div>
						
						{/* Skills tags */}
						{item.skills && item.size !== 'xs' && item.size !== 'sm' && (
							<div className="flex flex-wrap gap-1 mt-2">
								{item.skills.slice(0, 3).map((skill) => (
									<span
										key={skill}
										className="px-1.5 py-0.5 rounded-full bg-zinc-800 text-[7px] text-zinc-400 border border-zinc-700"
									>
										{skill}
									</span>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Gold seal/stamp effect */}
				<div className={`absolute bottom-2 right-2 w-8 h-8 rounded-full ${scheme.bg} border ${scheme.border} flex items-center justify-center opacity-60`}>
					<Star className={`${scheme.text} w-4 h-4`} />
				</div>

				{/* Link overlay on hover */}
				{item.credentialUrl && hovered && (
					<a
						href={item.credentialUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900/90 border ${scheme.border} ${scheme.text} transition-all`}
						aria-label={`Ver credencial: ${item.title}`}
					>
						<ExternalLink size={12} />
					</a>
				)}
			</div>
		</motion.div>
	);
}

// Render item based on type
function ShadowBoxItem({ item, index }: { item: CertificateItem; index: number }) {
	switch (item.type) {
		case 'badge':
			return <BadgeItem item={item} index={index} />;
		case 'medal':
			return <MedalItem item={item} index={index} />;
		case 'patch':
			return <PatchItem item={item} index={index} />;
		case 'certificate':
		default:
			return <CertificateCard item={item} index={index} />;
	}
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

	const certXL   = certificates.filter(c => c.type === 'certificate' && c.size === 'xl');
	const certLG   = certificates.filter(c => c.type === 'certificate' && c.size === 'lg');
	const certMD   = certificates.filter(c => c.type === 'certificate' && (c.size === 'md' || c.size === 'sm'));
	const badgesLG = certificates.filter(c => c.type === 'badge' && (c.size === 'md' || c.size === 'lg'));
	const badgesSM = certificates.filter(c => c.type === 'badge' && (c.size === 'xs' || c.size === 'sm'));
	const medals   = certificates.filter(c => c.type === 'medal');
	const patches  = certificates.filter(c => c.type === 'patch');

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

				{/* Shadow Box Frame */}
				<div className='relative mx-auto max-w-5xl'>
					{/* Outer frame - dark wood */}
					<div
						className='relative rounded-lg p-[10px] shadow-2xl'
						style={{
							background: 'linear-gradient(145deg, #3f3f46 0%, #18181b 40%, #27272a 70%, #3f3f46 100%)',
							boxShadow: '0 25px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
						}}
					>
						{/* Inner mat - blue velvet */}
						<div
							className='rounded-md p-[10px]'
							style={{
								background: 'linear-gradient(145deg, #1e3a5f 0%, #0f172a 50%, #1e2d3d 100%)',
							}}
						>
							{/* Glass reflection */}
							<div className='pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.04] via-transparent to-transparent' />

							{/* Inner display area */}
							<div
								className='relative rounded-sm px-4 py-6 md:px-8 md:py-8'
								style={{
									background: '#0a0a0f',
									boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6), inset 0 0 30px rgba(14,30,60,0.3)',
								}}
							>
								{/* Year labels */}
								<div className='absolute top-4 left-5 md:top-5 md:left-7'>
									<span className='font-mono text-base tracking-[0.35em] text-zinc-600 md:text-xl'>
										2024
									</span>
								</div>
								<div className='absolute top-4 right-5 md:top-5 md:right-7'>
									<span className='font-mono text-base tracking-[0.35em] text-zinc-600 md:text-xl'>
										2026
									</span>
								</div>

								{/* ===== ROW 1: top badges (esq) + cert XL (centro) + top badges (dir) ===== */}
								<div className='mt-10 flex flex-wrap items-start justify-center gap-3 md:mt-12 md:gap-5'>
									{/* Left column — badges grandes */}
									<div className='flex flex-col items-center gap-3'>
										{badgesLG.slice(0, 2).map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i} />
										))}
									</div>

									{/* Center — certificado principal XL */}
									<div className='flex flex-col items-center gap-3'>
										{certXL.map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 2} />
										))}
									</div>

									{/* Right column — badges grandes */}
									<div className='flex flex-col items-center gap-3'>
										{badgesLG.slice(2).map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 4} />
										))}
									</div>
								</div>

								{/* ===== DIVIDER ===== */}
								<div className='my-4 flex items-center gap-2 md:my-5'>
									<div className='h-px flex-1 bg-zinc-800' />
									<Star className='h-3 w-3 text-zinc-700' />
									<Star className='h-3 w-3 text-zinc-700' />
									<Star className='h-3 w-3 text-zinc-700' />
									<div className='h-px flex-1 bg-zinc-800' />
								</div>

								{/* ===== ROW 2: badges pequenos (esq) + certs LG (centro) + badges pequenos (dir) ===== */}
								<div className='flex flex-wrap items-start justify-center gap-3 md:gap-5'>
									{/* Small badges left */}
									<div className='flex flex-col items-center gap-3'>
										{badgesSM.slice(0, 3).map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 7} />
										))}
									</div>

									{/* Certs LG */}
									<div className='flex flex-col items-center gap-3'>
										<div className='flex flex-wrap items-start justify-center gap-3'>
											{certLG.slice(0, 2).map((item, i) => (
												<ShadowBoxItem key={item.id} item={item} index={i + 10} />
											))}
										</div>
										<div className='flex flex-wrap items-start justify-center gap-3'>
											{certLG.slice(2).map((item, i) => (
												<ShadowBoxItem key={item.id} item={item} index={i + 12} />
											))}
										</div>
									</div>

									{/* Small badges right */}
									<div className='flex flex-col items-center gap-3'>
										{badgesSM.slice(3).map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 14} />
										))}
									</div>
								</div>

								{/* ===== DIVIDER ===== */}
								<div className='my-4 flex items-center gap-2 md:my-5'>
									<div className='h-px flex-1 bg-zinc-800' />
									<Star className='h-3 w-3 text-zinc-700' />
									<Star className='h-3 w-3 text-zinc-700' />
									<Star className='h-3 w-3 text-zinc-700' />
									<div className='h-px flex-1 bg-zinc-800' />
								</div>

								{/* ===== ROW 3: medalhas + certs MD + patches ===== */}
								<div className='flex flex-wrap items-center justify-center gap-3 md:gap-5'>
									{medals.map((item, i) => (
										<ShadowBoxItem key={item.id} item={item} index={i + 17} />
									))}
									{certMD.map((item, i) => (
										<ShadowBoxItem key={item.id} item={item} index={i + 21} />
									))}
								</div>

								{/* ===== ROW 4: patches (linha de rodapé) ===== */}
								<div className='mt-4 flex flex-wrap items-center justify-center gap-3 md:mt-5 md:gap-4'>
									{patches.map((item, i) => (
										<ShadowBoxItem key={item.id} item={item} index={i + 23} />
									))}
								</div>

								{/* Nameplate */}
								<div className='mt-6 flex justify-center'>
									<div
										className='rounded-sm px-8 py-2 shadow-lg'
										style={{
											background: 'linear-gradient(90deg, #92400e, #d97706, #b45309, #d97706, #92400e)',
										}}
									>
										<p className='font-semibold uppercase tracking-[0.25em] text-amber-100 text-[10px] md:text-xs'>
											Arthur Martins
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Cast shadow below frame */}
					<div className='absolute -bottom-6 left-6 right-6 h-10 rounded-full bg-black/40 blur-xl' />
				</div>
			</div>

			<style jsx>{`
				.clip-ribbon {
					clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
				}
			`}</style>
		</section>
	);
}
