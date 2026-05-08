'use client';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { type RefObject, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
	question: string;
	answer: string;
}

const faqs: FAQItem[] = [
	{
		question: 'Quanto tempo demora para criar um site premium?',
		answer:
			'Um projeto completo, desde o briefing até a entrega final com animações avançadas e otimização de performance, geralmente leva de 4 a 8 semanas, dependendo da complexidade do escopo.',
	},
	{
		question: 'Quais tecnologias vocês utilizam no desenvolvimento?',
		answer:
			'Nossa stack é focada no que há de mais moderno: Next.js (React) no front-end, TailwindCSS para estilização milimétrica, e GSAP / Lenis / Framer Motion para animações super fluidas.',
	},
	{
		question: 'O código final e o design serão meus?',
		answer:
			'Sim, 100%. Ao final do projeto, todos os assets de design (Figma) e o repositório de código fonte são transferidos diretamente para você ou para a conta da sua empresa.',
	},
	{
		question: 'Vocês fazem manutenção ou SEO depois do site estar online?',
		answer:
			'Com certeza. Oferecemos pacotes de pós-venda e manutenção (Technical SEO, atualizações de segurança e integrações) para garantir que sua plataforma continue no topo do mercado.',
	},
	{
		question: 'Como funciona a comunicação durante o projeto?',
		answer:
			'Criamos um canal direto e exclusivo de comunicação (via Slack ou WhatsApp). Temos reuniões de alinhamento e demonstrações visuais ao fim de cada milestone para que você acompanhe cada pixel do processo.',
	},
];

export default function Faqs() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const sectionRef = useRef<HTMLElement | null>(null);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	const toggleOpen = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	useEffect(() => {
		if (!sectionRef.current || !headingRef.current) {
			return;
		}

		const ctx = gsap.context(
			() => {
				const heading = headingRef.current;

				if (!heading) {
					return;
				}

				const words = heading.innerText.split(' ');

				heading.innerHTML = words
					.map(
						(word) =>
							`<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">
									<span
										class="gsap-faq-word"
										style="display:inline-block;transform:translateY(110%);"
									>
										${word}&nbsp;
									</span>
								</span>`,
					)
					.join('');

				gsap.to('.gsap-faq-word', {
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

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			id='faqs'
			className='relative mt-8 w-full overflow-hidden border-foreground/10 border-t py-16 md:mt-12 md:py-40'
		>
			<div className='relative z-10 px-4 md:px-0'>
				<div className='mb-12 md:mb-20'>
					<h2 className='mb-4 font-black text-foreground/35 text-xs uppercase tracking-[0.35em] md:mb-6'>
						Suas Dúvidas
					</h2>

					<h3
						ref={headingRef}
						className='max-w-3xl font-black text-4xl tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl'
					>
						Perguntas{' '}
						<span className='font-normal font-serif text-primary italic'>
							Frequentes
						</span>
					</h3>
				</div>

				<div className='flex flex-col border-foreground/10 border-t'>
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;

						return (
							<motion.div
								key={faq.question}
								initial={{
									opacity: 0,
									y: 15,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								viewport={{
									once: true,
								}}
								transition={{
									duration: 0.5,
									delay: index * 0.08,
								}}
								className='border-foreground/10 border-b'
							>
								<button
									type='button'
									onClick={() => toggleOpen(index)}
									className='group flex w-full items-center justify-between py-5 text-left focus:outline-none md:py-8'
								>
									<span
										className={`pr-4 font-light text-lg transition-colors sm:text-xl md:text-2xl lg:text-3xl ${
											isOpen
												? 'text-foreground'
												: 'text-foreground/70 group-hover:text-foreground'
										}`}
									>
										{faq.question}
									</span>

									<div
										className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:h-12 md:w-12 ${
											isOpen
												? 'rotate-180 border-primary bg-primary text-white'
												: 'border-foreground/20 text-foreground group-hover:border-foreground'
										}`}
									>
										<ChevronDown size={20} />
									</div>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{
												height: 0,
												opacity: 0,
											}}
											animate={{
												height: 'auto',
												opacity: 1,
											}}
											exit={{
												height: 0,
												opacity: 0,
											}}
											transition={{
												duration: 0.4,
												ease: [0.16, 1, 0.3, 1],
											}}
											className='overflow-hidden'
										>
											<div className='pt-2 pr-4 pb-6 font-light text-base text-foreground/50 leading-relaxed md:pr-12 md:pb-8 md:text-xl'>
												{faq.answer}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
