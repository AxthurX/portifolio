"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  ProgressSlider,
  SliderContent,
  SliderWrapper,
  SliderBtnGroup,
  SliderBtn,
} from "@/components/ui/progressive-carousel";

const PROJECTS = [
  {
    sliderName: "elevate",
    client: "ELEVATE TECH",
    category: "Branding & Web Design",
    year: "2024",
    desc: "Redesign completo de identidade visual e plataforma digital para uma startup de finanças que triplicou sua conversão.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
  },
  {
    sliderName: "aura",
    client: "AURA BEAUTY",
    category: "E-Commerce Premium",
    year: "2024",
    desc: "Experiência de compra imersiva para marca de beleza premium com AR try-on e jornada personalizada.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1487&auto=format&fit=crop",
  },
  {
    sliderName: "nxt",
    client: "NXT MOBILITY",
    category: "UX/UI & Dashboard",
    year: "2023",
    desc: "App de mobilidade urbana com dashboard de dados em tempo real, design system proprietário e animações nativas.",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1374&auto=format&fit=crop",
  },
  {
    sliderName: "lumina",
    client: "LUMINA ART",
    category: "Digital Studio",
    year: "2023",
    desc: "Plataforma interativa para galeria de arte contemporânea com tours virtuais e integração com Web3.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1364&auto=format&fit=crop",
  },
];

export default function PortfolioDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop — only the bottom part visible below the drawer ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* ── Drawer — slides DOWN from the top ── */}
          <motion.div
            key="drawer"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-[70] rounded-b-[2rem] overflow-hidden flex flex-col"
            style={{ height: "78vh", background: "var(--cream)", color: "var(--foreground)" }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-6 pb-4 border-b border-foreground/10 flex-shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/35 font-black mb-1">Portfólio</p>
                <h2 className="text-xl md:text-3xl font-black tracking-tight">
                  Projetos <span className="font-serif italic font-normal text-[#965EC7]">Recentes</span>
                </h2>
              </div>
              {/* Top-right close (X) */}
              <button
                onClick={onClose}
                aria-label="Fechar portfólio"
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200 group"
              >
                <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Carousel content ── */}
            <div className="flex-1 min-h-0 px-4 md:px-8 pt-4 pb-2 overflow-hidden flex flex-col gap-3">
              <ProgressSlider
                activeSlider="elevate"
                duration={7000}
                className="flex flex-col h-full gap-3"
              >
                {/* Image slides */}
                <SliderContent className="relative flex-1 min-h-0 rounded-2xl overflow-hidden">
                  {PROJECTS.map((p) => (
                    <SliderWrapper
                      key={p.sliderName}
                      value={p.sliderName}
                      className="absolute inset-0"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={p.img}
                          alt={p.client}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 85vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex items-end justify-between">
                          <div>
                            <span className="text-[#965EC7] text-[10px] uppercase tracking-[0.3em] font-bold">
                              {p.category} · {p.year}
                            </span>
                            <h3 className="text-white text-2xl md:text-4xl font-semibold tracking-tight mt-1">
                              {p.client}
                            </h3>
                            <p className="text-white/60 text-sm mt-1 max-w-lg hidden md:block">
                              {p.desc}
                            </p>
                          </div>
                          <a
                            href="#cases"
                            onClick={onClose}
                            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group flex-shrink-0"
                          >
                            <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    </SliderWrapper>
                  ))}
                </SliderContent>

                {/* Navigation buttons — white progress bar with mix-blend-mode:difference for color inversion */}
                <SliderBtnGroup className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-shrink-0">
                  {PROJECTS.map((p) => (
                    <SliderBtn
                      key={p.sliderName}
                      value={p.sliderName}
                      className="text-left cursor-pointer p-3 md:p-4 rounded-xl border border-foreground/10 hover:border-foreground/30 transition-colors overflow-hidden"
                      progressBarClass="bg-white h-full"
                      progressStyle={{ mixBlendMode: "difference" }}
                    >
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#965EC7] font-bold block mb-1 truncate relative z-10">
                        {p.category}
                      </span>
                      <span className="text-xs md:text-sm font-semibold text-foreground block truncate relative z-10">
                        {p.client}
                      </span>
                    </SliderBtn>
                  ))}
                </SliderBtnGroup>
              </ProgressSlider>
            </div>

            {/* ── Close handle — bottom center, primary close affordance ── */}
            <div className="flex-shrink-0 flex justify-center pb-3 pt-1">
              <motion.button
                onClick={onClose}
                aria-label="Fechar portfólio"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 group"
              >
                {/* Bouncing arrow indicator */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-9 h-9 rounded-full border border-foreground/25 flex items-center justify-center group-hover:border-[#965EC7] group-hover:text-[#965EC7] transition-colors duration-300"
                >
                  <ChevronUp className="w-4 h-4" strokeWidth={2} />
                </motion.div>
                <span className="text-[9px] uppercase tracking-widest text-foreground/30 font-bold group-hover:text-[#965EC7] transition-colors duration-300">fechar</span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
