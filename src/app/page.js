"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import QuemSomos from "@/components/QuemSomos";
import Processos from "@/components/Processos";
import Faqs from "@/components/Faqs";
import Cases from "@/components/Cases";
import NossoTime from "@/components/NossoTime";
import Contato from "@/components/Contato";
import PortfolioDrawer from "@/components/PortfolioDrawer";

export default function Home() {
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (portfolioOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [portfolioOpen]);

  return (
    <>
      <main className="relative w-full bg-background min-h-screen text-foreground flex flex-col items-center">
        <Header onPortfolioOpen={() => setPortfolioOpen(true)} />
        <div className="w-full max-w-[1800px] px-4 md:px-8 xl:px-12 pt-[120px] pb-12 flex flex-col gap-12">
          <Hero />
          <BentoGrid />
          <Cases />
          <QuemSomos />
          <Processos />
          <Faqs />
          <NossoTime />
          <Contato />
        </div>
      </main>

      {/* Portfolio Drawer — rendered outside main to avoid layout constraints */}
      <PortfolioDrawer
        isOpen={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
      />
    </>
  );
}
