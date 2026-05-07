"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Quanto tempo demora para criar um site premium?",
    answer: "Um projeto completo, desde o briefing até a entrega final com animações avançadas e otimização de performance, geralmente leva de 4 a 8 semanas, dependendo da complexidade do escopo.",
  },
  {
    question: "Quais tecnologias vocês utilizam no desenvolvimento?",
    answer: "Nossa stack é focada no que há de mais moderno: Next.js (React) no front-end, TailwindCSS para estilização milimétrica, e GSAP / Lenis / Framer Motion para animações super fluidas.",
  },
  {
    question: "O código final e o design serão meus?",
    answer: "Sim, 100%. Ao final do projeto, todos os assets de design (Figma) e o repositório de código fonte são transferidos diretamente para você ou para a conta da sua empresa.",
  },
  {
    question: "Vocês fazem manutenção ou SEO depois do site estar online?",
    answer: "Com certeza. Oferecemos pacotes de pós-venda e manutenção (Technical SEO, atualizações de segurança e integrações) para garantir que sua plataforma continue no topo do mercado.",
  },
  {
    question: "Como funciona a comunicação durante o projeto?",
    answer: "Criamos um canal direto e exclusivo de comunicação (via Slack ou WhatsApp). Temos reuniões de alinhamento e demonstrações visuais ao fim de cada milestone para que você acompanhe cada pixel do processo.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (!heading) return;

      const words = heading.innerText.split(" ");
      heading.innerHTML = words
        .map(
          (w) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-faq-word" style="display:inline-block;transform:translateY(110%);">${w}&nbsp;</span></span>`
        )
        .join("");

      gsap.to(".gsap-faq-word", {
        y: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="w-full py-16 md:py-40 border-t border-foreground/10 mt-8 md:mt-12 relative overflow-hidden"
    >
      <div className="px-4 md:px-0 relative z-10">
        {/* Heading — LEFT */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-xs uppercase tracking-[0.35em] font-black text-foreground/35 mb-4 md:mb-6">Suas Dúvidas</h2>
          <h3
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] max-w-3xl"
          >
            Perguntas <span className="font-serif italic font-normal text-[#965EC7]">Frequentes</span>
          </h3>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col border-t border-foreground/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border-b border-foreground/10"
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full py-5 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span
                    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light transition-colors pr-4 ${
                      isOpen ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen
                        ? "border-[#965EC7] bg-[#965EC7] text-white rotate-180"
                        : "border-foreground/20 text-foreground group-hover:border-foreground"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 md:pb-8 pt-2 pr-4 md:pr-12 text-foreground/50 font-light leading-relaxed text-base md:text-xl">
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
