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
	const metricsRef = useRef<HTMLDivElement | null>(null);

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

			// --- Paragraph reveals ---
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
				{ el: '#counter-exp', end: 10, suffix: '+' },
				{ el: '#counter-proj', end: 50, suffix: '+' },
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
			className='relative mt-16 flex min-h-[80vh] w-full flex-col border-foreground/10 border-t md:mt-24 md:flex-row'
		>
			<div className='absolute top-0 bottom-0 left-1/2 hidden w-px bg-foreground/10 md:block' />

			<div className='flex w-full flex-col justify-between border-foreground/10 border-b p-6 md:w-1/2 md:border-r md:border-b-0 md:p-16 lg:p-20 xl:p-28'>
				<div>
					<h2 className='mb-8 font-black text-foreground/35 text-xs uppercase tracking-[0.35em] md:mb-12'>
						Sobre Mim
					</h2>

					<h3
						ref={headingRef}
						className='font-black text-4xl leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl'
					>
						Transformando{' '}
						<span className='font-normal font-serif text-primary italic'>
							ideias malucas
						</span>{' '}
						em interfaces funcionais.
					</h3>
				</div>
			</div>

			{/* Right */}
			<div className='flex w-full flex-col justify-end p-6 md:w-1/2 md:p-16 lg:p-20 xl:p-28'>
				<div className='max-w-xl md:ml-auto'>
					<p
						ref={textRef}
						className='mb-6 font-light text-foreground/70 text-lg leading-relaxed md:mb-10 md:text-xl lg:text-2xl'
						style={{ opacity: 0 }}
					>
						Atuo como desenvolvedor fullstack com forte foco em frontend,
						criando interfaces performáticas, escaláveis e com atenção extrema
						aos detalhes. Grande parte do meu trabalho envolve transformar
						ideias em produtos funcionais usando React, Next.js, TypeScript e
						animações imersivas.
					</p>

					<p
						ref={text2Ref}
						className='font-light text-foreground/70 text-lg leading-relaxed md:text-xl lg:text-2xl'
						style={{ opacity: 0 }}
					>
						Tenho experiência na construção de aplicações modernas, APIs,
						arquiteturas escaláveis e componentes reutilizáveis, sempre buscando
						clean code, performance e uma experiência visual acima do padrão.
					</p>

					<div
						ref={metricsRef}
						className='mt-12 flex gap-8 border-foreground/10 border-t pt-8 md:mt-20 md:gap-10 md:pt-10'
					>
						<div>
							<div
								id='counter-exp'
								className='mb-2 font-black text-5xl tracking-tight md:mb-3 md:text-6xl'
							>
								5+
							</div>

							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Anos de XP
							</div>
						</div>

						<div>
							<div
								id='counter-proj'
								className='mb-2 font-black text-5xl tracking-tight md:mb-3 md:text-6xl'
							>
								20+
							</div>

							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Projetos
							</div>
						</div>

						<div>
							<div
								id='counter-entrega'
								className='mb-2 font-black text-5xl text-primary tracking-tight md:mb-3 md:text-6xl'
							>
								100%
							</div>

							<div className='font-black text-foreground/35 text-xs uppercase tracking-widest'>
								Dedicação
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
