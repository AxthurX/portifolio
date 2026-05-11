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
	{
		id: '1',
		title: 'Google Project Management Professional Certificate',
		issuer: 'Coursera / Google',
		date: 'Abr 2026',
		credentialUrl: '#',
		skills: ['Gestão de Projetos', 'Agile', 'Scrum'],
		type: 'certificate',
		size: 'xl',
		color: 'gold',
	},
	{
		id: '2',
		title: 'Google Agile Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: '1GAD79VY6B3P',
		credentialUrl: '#',
		skills: ['Scrum', 'Kanban'],
		type: 'badge',
		size: 'md',
		color: 'blue',
	},
	{
		id: '3',
		title: 'Google Project Management',
		issuer: 'Google',
		date: 'Ago 2025',
		credentialCode: 'G5LRW5CUFGWH',
		credentialUrl: '#',
		skills: ['Gestão de Projetos'],
		type: 'certificate',
		size: 'lg',
		color: 'gold',
	},
	{
		id: '4',
		title: 'Fundamentos de Suporte de TI',
		issuer: 'Google',
		date: 'Jan 2025',
		credentialUrl: '#',
		skills: ['TI', 'Suporte'],
		type: 'badge',
		size: 'sm',
		color: 'green',
	},
	{
		id: '5',
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
		id: '6',
		title: 'CSS & Animations',
		issuer: 'Frontend Masters',
		date: 'Dez 2024',
		credentialUrl: '#',
		skills: ['CSS', 'GSAP'],
		type: 'patch',
		size: 'sm',
		color: 'purple',
	},
	{
		id: '7',
		title: 'TypeScript',
		issuer: 'Microsoft',
		date: 'Nov 2024',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'blue',
	},
	{
		id: '8',
		title: 'React Developer',
		issuer: 'Meta',
		date: 'Out 2024',
		credentialUrl: '#',
		skills: ['React'],
		type: 'medal',
		size: 'sm',
		color: 'blue',
	},
	{
		id: '9',
		title: 'Node.js',
		issuer: 'OpenJS',
		date: 'Set 2024',
		credentialUrl: '#',
		type: 'badge',
		size: 'xs',
		color: 'green',
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

	// Separate items by type for layout
	const mainCertificates = certificates.filter(c => c.type === 'certificate');
	const badges = certificates.filter(c => c.type === 'badge');
	const medals = certificates.filter(c => c.type === 'medal');
	const patches = certificates.filter(c => c.type === 'patch');

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
					{/* Outer frame - dark wood style */}
					<div className='relative rounded-lg bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-2 shadow-2xl'>
						{/* Inner frame border - blue velvet mat */}
						<div className='rounded-md bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-3 md:p-4'>
							{/* Glass reflection effect */}
							<div className='absolute inset-0 rounded-md bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none' />
							
							{/* Display area - dark velvet background */}
							<div 
								className='relative rounded-sm bg-zinc-950 p-4 md:p-8 min-h-[500px]'
								style={{
									backgroundImage: `
										radial-gradient(ellipse at 20% 20%, rgba(30, 58, 138, 0.08) 0%, transparent 50%),
										radial-gradient(ellipse at 80% 80%, rgba(30, 58, 138, 0.05) 0%, transparent 50%),
										linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)
									`,
									boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)',
								}}
							>
								{/* Year markers like in reference image */}
								<div className='absolute top-4 left-4 md:top-6 md:left-8'>
									<span className='text-zinc-600 font-mono text-lg md:text-2xl tracking-[0.3em]'>
										2024
									</span>
								</div>
								<div className='absolute top-4 right-4 md:top-6 md:right-8'>
									<span className='text-zinc-600 font-mono text-lg md:text-2xl tracking-[0.3em]'>
										2026
									</span>
								</div>

								{/* Main content grid - mosaic layout */}
								<div className='mt-12 md:mt-16'>
									{/* Top row - badges and small items on sides, certificate in middle */}
									<div className='flex flex-wrap items-start justify-center gap-4 md:gap-6'>
										{/* Left side badges */}
										<div className='flex flex-col gap-4'>
											{badges.slice(0, 2).map((item, i) => (
												<ShadowBoxItem key={item.id} item={item} index={i} />
											))}
										</div>
										
										{/* Center - main certificate */}
										<div className='flex flex-col items-center gap-4'>
											{mainCertificates.slice(0, 1).map((item, i) => (
												<ShadowBoxItem key={item.id} item={item} index={i} />
											))}
											
											{/* Medals row below main cert */}
											<div className='flex gap-3 mt-2'>
												{medals.map((item, i) => (
													<ShadowBoxItem key={item.id} item={item} index={i + 3} />
												))}
											</div>
										</div>
										
										{/* Right side badges */}
										<div className='flex flex-col gap-4'>
											{badges.slice(2).map((item, i) => (
												<ShadowBoxItem key={item.id} item={item} index={i + 5} />
											))}
										</div>
									</div>

									{/* Middle section - certificates row */}
									<div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8'>
										{mainCertificates.slice(1).map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 7} />
										))}
									</div>

									{/* Bottom row - patches and small items */}
									<div className='flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8'>
										{patches.map((item, i) => (
											<ShadowBoxItem key={item.id} item={item} index={i + 10} />
										))}
									</div>
								</div>

								{/* Nameplate at bottom */}
								<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
									<div className='px-6 py-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-sm shadow-lg'>
										<p className='text-[10px] md:text-xs font-semibold text-amber-100 uppercase tracking-[0.2em]'>
											Arthur Martins
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Frame shadow on surface */}
					<div className='absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-black/20 to-transparent blur-md rounded-full' />
				</div>
			</div>

			{/* Custom CSS for ribbon clip path */}
			<style jsx>{`
				.clip-ribbon {
					clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
				}
			`}</style>
		</section>
	);
}
