"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function QuemSomos() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Heading reveal (word by word) ---
      const heading = headingRef.current;
      if (heading) {
        const originalHTML = heading.innerHTML;
        const words = heading.innerText.split(" ");
        heading.innerHTML = words
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="gsap-word" style="display:inline-block;transform:translateY(110%);">${w}</span></span>`
          )
          .join(" ");

        gsap.to(".gsap-word", {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        });
      }

      // --- Paragraph reveals ---
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        text2Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: text2Ref.current, start: "top 88%", once: true },
        }
      );

      // --- Counters ---
      const counters = [
        { el: "#counter-exp", end: 10, suffix: "+" },
        { el: "#counter-proj", end: 50, suffix: "+" },
        { el: "#counter-entrega", end: 100, suffix: "%" },
      ];
      counters.forEach(({ el, end, suffix }) => {
        const target = document.querySelector(el);
        if (!target) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            target.innerText = Math.floor(obj.val) + suffix;
          },
          scrollTrigger: { trigger: target, start: "top 90%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quem-somos"
      className="w-full min-h-[80vh] flex flex-col md:flex-row border-t border-foreground/10 relative mt-16 md:mt-24"
    >
      {/* Vertical divider */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10 hidden md:block" />

      {/* Left */}
      <div className="w-full md:w-1/2 p-6 md:p-16 lg:p-20 xl:p-28 flex flex-col justify-between border-b md:border-b-0 md:border-r border-foreground/10">
        <div>
          <h2 className="text-xs uppercase tracking-[0.35em] font-black text-foreground/35 mb-8 md:mb-12">Quem Somos</h2>
          <h3
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.03em]"
          >
            Desafiamos o <span className="font-serif italic font-normal text-[#965EC7]">ordinário</span> para construir o extraordinário.
          </h3>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 p-6 md:p-16 lg:p-20 xl:p-28 flex flex-col justify-end">
        <div className="max-w-xl md:ml-auto">
          <p
            ref={textRef}
            className="text-foreground/70 text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-6 md:mb-10"
            style={{ opacity: 0 }}
          >
            A WHYS é um estúdio digital focado em criar experiências imersivas. Nós unimos um design meticuloso, pixel-perfect, com tecnologias de alta performance para entregar resultados que não apenas funcionam, mas impressionam.
          </p>
          <p
            ref={text2Ref}
            className="text-foreground/70 text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
            style={{ opacity: 0 }}
          >
            Nossa missão é elevar o patamar de marcas ambiciosas através de identidades visuais sofisticadas e interfaces interativas.
          </p>

          <div ref={metricsRef} className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-foreground/10 flex gap-8 md:gap-10">
            <div>
              <div id="counter-exp" className="text-5xl md:text-6xl font-black tracking-tight mb-2 md:mb-3">0+</div>
              <div className="text-xs uppercase tracking-widest text-foreground/35 font-black">Anos de XP</div>
            </div>
            <div>
              <div id="counter-proj" className="text-5xl md:text-6xl font-black tracking-tight mb-2 md:mb-3">0+</div>
              <div className="text-xs uppercase tracking-widest text-foreground/35 font-black">Projetos</div>
            </div>
            <div>
              <div id="counter-entrega" className="text-5xl md:text-6xl font-black tracking-tight mb-2 md:mb-3 text-[#965EC7]">0%</div>
              <div className="text-xs uppercase tracking-widest text-foreground/35 font-black">Entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
