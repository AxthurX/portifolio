"use client";

import { InteractiveTeamCard } from "@/components/ui/3d-card";

const teamMembers = [
  {
    id: 1,
    title: "Alexandre",
    subtitle: "Lead Designer",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    actionText: "Ver Perfil",
    href: "#"
  },
  {
    id: 2,
    title: "Beatriz",
    subtitle: "UX/UI Specialist",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    actionText: "Ver Perfil",
    href: "#"
  },
  {
    id: 3,
    title: "Carlos",
    subtitle: "Fullstack Developer",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    actionText: "Ver Perfil",
    href: "#"
  },
  {
    id: 4,
    title: "Daniela",
    subtitle: "Product Manager",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    actionText: "Ver Perfil",
    href: "#"
  }
];

export default function NossoTime() {
  return (
    <section id="nosso-time" className="w-full min-h-[80vh] py-16 md:py-24 mb-16 md:mb-32 flex flex-col items-start">
      <div className="w-full text-left mb-12 md:mb-16 px-4 md:px-0">
        <h2 className="text-xs uppercase tracking-[0.35em] font-black text-foreground/35 mb-4">A Agência</h2>
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em]">Nosso <span className="font-serif italic font-normal text-[#965EC7]">Time</span></h3>
      </div>

      <div
        className="flex flex-col sm:flex-row flex-wrap items-start justify-start gap-8 md:gap-12 w-full px-4 md:px-0"
        style={{ perspective: "1000px" }}
      >
        {teamMembers.map((member) => (
          <InteractiveTeamCard
            key={member.id}
            title={member.title}
            subtitle={member.subtitle}
            imageUrl={member.imageUrl}
            actionText={member.actionText}
            href={member.href}
            className="w-full max-w-xs sm:w-72"
            onActionClick={() => console.log(`Acessando perfil de ${member.title}`)}
          />
        ))}
      </div>
    </section>
  );
}
