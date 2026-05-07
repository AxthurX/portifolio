"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { AnimatedThemeToggle } from "./ui/animated-theme-toggle";

const navLinks = [
  { href: "#quem-somos", label: "Quem Somos" },
  { href: "#processos", label: "Processos" },
  { href: "#cases", label: "Cases" },
  { href: "#faqs", label: "FAQs" },
  { href: "#nosso-time", label: "Nosso Time" },
];

export default function Header({ onPortfolioOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-50 flex items-start justify-between px-4 md:px-8 xl:px-12 pt-6 pointer-events-none"
      >
        {/* Container Background — adapts to theme via CSS var */}
        <div
          className="absolute inset-x-4 md:inset-x-8 xl:inset-x-12 top-6 h-20 border border-foreground/10 rounded-full flex items-center justify-between pointer-events-none backdrop-blur-md"
          style={{ background: "var(--header-bg)" }}
        />

        {/* Left - Logo */}
        <div className="relative z-10 flex items-center h-20 pl-4 md:pl-6 lg:pl-10 pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity">
          <div className="rounded-full overflow-hidden border border-foreground/15 flex items-center justify-center bg-foreground/5 w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/logo-simbolo.png"
              alt="WHYS Icon"
              width={56}
              height={56}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        </div>

        {/* Center - Nav (Desktop only) */}
        <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
          {/* Left Links */}
          <div className="absolute right-[calc(50%+3.5rem)] lg:right-[calc(50%+4rem)] top-6 h-20 flex items-center justify-end gap-6 lg:gap-12 xl:gap-16 pointer-events-auto text-[10px] uppercase tracking-widest font-black">
            <a href="#quem-somos" className="text-foreground/60 hover:text-[#965EC7] transition-colors whitespace-nowrap">Quem Somos</a>
            <a href="#processos" className="text-foreground/60 hover:text-[#965EC7] transition-colors">Processos</a>
          </div>
          {/* Right Links */}
          <div className="absolute left-[calc(50%+3.5rem)] lg:left-[calc(50%+4rem)] top-6 h-20 flex items-center justify-start gap-6 lg:gap-12 xl:gap-16 pointer-events-auto text-[10px] uppercase tracking-widest font-black">
            <a href="#cases" className="text-foreground/60 hover:text-[#965EC7] transition-colors whitespace-nowrap">Cases</a>
            <a href="#faqs" className="text-foreground/60 hover:text-[#965EC7] transition-colors">FAQs</a>
            <a href="#nosso-time" className="text-foreground/60 hover:text-[#965EC7] transition-colors whitespace-nowrap">Nosso Time</a>
          </div>
        </div>

        {/* Center Drop Button */}
        <button
          onClick={onPortfolioOpen}
          className="absolute left-1/2 -translate-x-1/2 top-6 h-28 w-24 hidden md:flex flex-col items-center justify-end pb-4 border-x border-b border-foreground/10 rounded-b-full pointer-events-auto group outline-none hover:border-[#965EC7]/40 transition-colors"
          style={{ background: "var(--header-bg)" }}
          aria-label="Ver portfólio"
        >
          <span className="text-[10px] uppercase font-black tracking-widest text-foreground/50 mb-3 whitespace-nowrap -mt-6 group-hover:text-[#965EC7] transition-colors duration-300">VER MAIS</span>
          <div className="w-10 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-[#965EC7] transition-colors duration-300 overflow-hidden">
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-px bg-foreground block relative"
              style={{ height: "1.5rem" }}
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-r border-foreground rotate-45 translate-y-0.5" />
            </motion.span>
          </div>
        </button>

        {/* Right Actions */}
        <div className="relative z-10 flex items-center gap-2 md:gap-4 h-20 pr-3 md:pr-6 pointer-events-auto">
          <AnimatedThemeToggle />
          <a href="#contato" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-[11px] font-black uppercase tracking-wider hover:bg-[#965EC7] transition-colors duration-300">
            Trabalhe Conosco
            <span className="w-4 h-4 rounded-full border border-background/30 flex items-center justify-center text-[8px]">↗</span>
          </a>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-foreground/20 text-foreground hover:border-foreground/50 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu Overlay — cream in light, black in dark */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] panel-cream flex flex-col items-start justify-center px-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-6 flex items-center justify-center w-12 h-12 rounded-full border border-foreground/20 text-foreground hover:border-foreground/60 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="absolute top-7 left-6">
              <div className="rounded-full overflow-hidden border border-foreground/15 w-12 h-12">
                <Image src="/logo-simbolo.png" alt="WHYS" width={48} height={48} className="object-cover w-full h-full" unoptimized />
              </div>
            </div>

            {/* Nav Links — left-aligned, very large */}
            <nav className="flex flex-col gap-0 w-full">
              {/* Portfolio special button */}
              <motion.button
                onClick={() => { setMenuOpen(false); onPortfolioOpen(); }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl font-black text-foreground hover:text-[#965EC7] transition-colors tracking-tight text-left py-3 border-b border-foreground/10"
              >
                Portfólio
              </motion.button>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: (i + 1) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-6xl font-black text-foreground hover:text-[#965EC7] transition-colors tracking-tight text-left py-3 border-b border-foreground/10"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="absolute bottom-12"
            >
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-foreground text-background font-black text-sm uppercase tracking-widest hover:bg-[#965EC7] transition-colors duration-300"
              >
                Iniciar Projeto ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
