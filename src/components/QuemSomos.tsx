'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function QuemSomos() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const textRef = useRef<HTMLParagraphElement | null>(null);
	const text2Ref = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const heading = headingRef.current;

			if (heading) {
				const words = heading.innerText.split(' ');

				heading.innerHTML = words
					.map(
						(word) => `
							<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">
								<span
									class="gsap-word"
									style="display:inline-block;transform:translateY(110%);"
								>
									${word}
								</span>
							</span>
						`,
					)
					.join(' ');

				gsap.to(heading.querySelectorAll('.gsap-word'), {
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.04,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: heading,
						start: 'top 85%',
						once: true,
					},
				});
			}

			if (textRef.current) {
				gsap.fromTo(
					textRef.current,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: textRef.current,
							start: 'top 85%',
							once: true,
						},
					},
				);
			}

			if (text2Ref.current) {
				gsap.fromTo(
					text2Ref.current,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						delay: 0.1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: text2Ref.current,
							start: 'top 88%',
							once: true,
						},
					},
				);
			}

			const counters = [
				{ el: '#counter-exp', end: 5, suffix: '+' },
				{ el: '#counter-proj', end: 20, suffix: '+' },
				{ el: '#counter-entrega', end: 100, suffix: '%' },
			];

			counters.forEach(({ el, end, suffix }) => {
				const target = document.querySelector<HTMLElement>(el);

				if (!target) return;

				const obj = { val: 0 };

				gsap.to(obj, {
					val: end,
					duration: 1.6,
					ease: 'power2.out',
					onUpdate: () => {
						target.innerText = `${Math.floor(obj.val)}${suffix}`;
					},
					scrollTrigger: {
						trigger: target,
						start: 'top 90%',
						once: true,
					},
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='quem-somos'
			className='relative mt-16 flex min-h-[80vh] w-full flex-col border-border border-t md:mt-24 md:flex-row'
		>
			{/* Divider */}
			<div className='absolute top-0 bottom-0 left-1/2 hidden w-px bg-border md:block' />

			{/* Left */}
			<div className='flex w-full flex-col justify-between border-border border-b p-6 md:w-1/2 md:border-r md:border-b-0 md:p-16 lg:p-20'>
				<div>
					<span className='mb-6 block font-medium text-primary text-xs uppercase tracking-widest md:mb-10'>
						Sobre Mim
					</span>

					<h3
						ref={headingRef}
						className='font-bold text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
					>
						Transformando{' '}
						<span className='font-serif text-primary italic font-normal'>
							ideias
						</span>{' '}
						em interfaces funcionais.
					</h3>
				</div>
			</div>

			{/* Right */}
			<div className='flex w-full flex-col justify-end p-6 md:w-1/2 md:p-16 lg:p-20'>
				<div className='max-w-xl md:ml-auto'>
					<p
						ref={textRef}
						className='mb-6 text-muted-foreground text-base leading-relaxed md:mb-8 md:text-lg'
						style={{ opacity: 0 }}
					>
						Atuo como desenvolvedor fullstack com forte foco em frontend,
						criando interfaces performaticas, escalaveis e com atencao extrema
						aos detalhes. Grande parte do meu trabalho envolve transformar
						ideias em produtos funcionais usando React, Next.js, TypeScript e
						animacoes imersivas.
					</p>

					<p
						ref={text2Ref}
						className='text-muted-foreground text-base leading-relaxed md:text-lg'
						style={{ opacity: 0 }}
					>
						Tenho experiencia na construcao de aplicacoes modernas, APIs,
						arquiteturas escalaveis e componentes reutilizaveis, sempre buscando
						clean code, performance e uma experiencia visual acima do padrao.
					</p>

					{/* Metrics */}
					<div className='mt-10 flex gap-8 border-border border-t pt-8 md:mt-16 md:gap-12 md:pt-10'>
						<div>
							<div
								id='counter-exp'
								className='mb-2 text-gradient font-bold text-4xl tracking-tight md:text-5xl'
							>
								5+
							</div>
							<div className='text-muted-foreground text-xs uppercase tracking-widest'>
								Anos de XP
							</div>
						</div>

						<div>
							<div
								id='counter-proj'
								className='mb-2 text-gradient font-bold text-4xl tracking-tight md:text-5xl'
							>
								20+
							</div>
							<div className='text-muted-foreground text-xs uppercase tracking-widest'>
								Projetos
							</div>
						</div>

						<div>
							<div
								id='counter-entrega'
								className='mb-2 font-bold text-4xl text-primary tracking-tight md:text-5xl'
							>
								100%
							</div>
							<div className='text-muted-foreground text-xs uppercase tracking-widest'>
								Dedicacao
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
