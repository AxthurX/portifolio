"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

// ─── Config ────────────────────────────────────────────────
const WA_NUMBER = "5569981162676";

const sendToWhatsApp = (payload) => {
  const text = Object.entries(payload)
    .filter(([, v]) => v)
    .map(([k, v]) => `*${k}:* ${v}`)
    .join("\n");
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
};

// ─── Design tokens (cream palette) ─────────────────────────
const CREAM     = "#f4f4f0";
const INK       = "#1a1a1a";
const INK_GHOST = "rgba(26,26,26,0.12)";
const PURPLE    = "#965EC7";

// ─── Shared form primitives ─────────────────────────────────
const iClass =
  "w-full bg-transparent border-b py-3 text-base font-light focus:outline-none transition-all duration-300 placeholder:opacity-30";
const iStyle = { borderColor: INK_GHOST, color: INK };
const iFocusStyle = { borderColor: INK };

function Field({ label, id, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.25em] font-black"
        style={{ color: `${INK}55` }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function FInput({ id, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      className={iClass}
      style={{ ...iStyle, ...(focused ? iFocusStyle : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}

function FTextarea({ id, rows = 4, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      id={id}
      rows={rows}
      className={`${iClass} resize-none leading-relaxed`}
      style={{ ...iStyle, ...(focused ? iFocusStyle : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}

// Budget chips
const BUDGETS = ["< R$ 5k", "R$ 5–15k", "R$ 15–50k", "R$ 50k+"];
function BudgetChips({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {BUDGETS.map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => onChange(value === b ? "" : b)}
          className="px-4 py-2 rounded-full border text-xs font-semibold tracking-wide transition-all duration-200"
          style={
            value === b
              ? { background: INK, color: CREAM, borderColor: INK }
              : { background: "transparent", color: INK, borderColor: INK_GHOST + "aa" }
          }
        >
          {b}
        </button>
      ))}
    </div>
  );
}

// Submit button
function SubmitBtn({ sending, label = "Enviar via WhatsApp" }) {
  return (
    <motion.button
      type="submit"
      disabled={sending}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 rounded-full py-4 px-8 w-full sm:w-fit text-sm font-semibold tracking-wide transition-colors cursor-pointer disabled:opacity-50"
      style={{ background: INK, color: CREAM }}
    >
      {sending ? "Abrindo WhatsApp…" : label}
      {!sending && <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />}
    </motion.button>
  );
}

// ─── Form: 01 Start a project ───────────────────────────────
function ProjectForm() {
  const [d, setD] = useState({ Nome: "", Empresa: "", Email: "", Budget: "", Detalhes: "" });
  const [sending, setSending] = useState(false);
  const handle = (k) => (e) => setD((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    sendToWhatsApp({ Tipo: "Novo Projeto", ...d });
    setTimeout(() => setSending(false), 1400);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-7 w-full max-w-lg">
      <Field label="Nome" id="p-nome">
        <FInput id="p-nome" type="text" placeholder="Seu nome completo" value={d.Nome} onChange={handle("Nome")} required autoComplete="name" />
      </Field>
      <Field label="Empresa" id="p-empresa">
        <FInput id="p-empresa" type="text" placeholder="Nome da empresa (opcional)" value={d.Empresa} onChange={handle("Empresa")} />
      </Field>
      <Field label="E-mail" id="p-email">
        <FInput id="p-email" type="email" placeholder="seu@email.com" value={d.Email} onChange={handle("Email")} required autoComplete="email" />
      </Field>
      <Field label="Budget estimado" id="p-budget">
        <BudgetChips value={d.Budget} onChange={(v) => setD((p) => ({ ...p, Budget: v }))} />
      </Field>
      <Field label="Detalhes do Projeto" id="p-detalhes">
        <FTextarea id="p-detalhes" rows={5} placeholder="Descreva o projeto, objetivos e prazo…" value={d.Detalhes} onChange={handle("Detalhes")} required />
      </Field>
      <SubmitBtn sending={sending} label="Iniciar conversa" />
    </form>
  );
}

// ─── Form: 02 Application ───────────────────────────────────
function ApplicationForm() {
  const [d, setD] = useState({ Nome: "", Vaga: "", Portfolio: "", LinkedIn: "" });
  const [sending, setSending] = useState(false);
  const handle = (k) => (e) => setD((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    sendToWhatsApp({ Tipo: "Candidatura", ...d });
    setTimeout(() => setSending(false), 1400);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-7 w-full max-w-lg">
      <Field label="Nome" id="a-nome">
        <FInput id="a-nome" type="text" placeholder="Seu nome completo" value={d.Nome} onChange={handle("Nome")} required autoComplete="name" />
      </Field>
      <Field label="Vaga desejada" id="a-vaga">
        <FInput id="a-vaga" type="text" placeholder="Ex: Designer UI/UX, Dev Front-end…" value={d.Vaga} onChange={handle("Vaga")} required />
      </Field>
      <Field label="Portfolio URL" id="a-portfolio">
        <FInput id="a-portfolio" type="url" placeholder="https://seuportfolio.com" value={d.Portfolio} onChange={handle("Portfolio")} />
      </Field>
      <Field label="LinkedIn" id="a-linkedin">
        <FInput id="a-linkedin" type="url" placeholder="https://linkedin.com/in/perfil" value={d.LinkedIn} onChange={handle("LinkedIn")} />
      </Field>
      <SubmitBtn sending={sending} label="Enviar candidatura" />
    </form>
  );
}

// ─── Form: 03 General Inquiry ───────────────────────────────
function InquiryForm() {
  const [d, setD] = useState({ Nome: "", Email: "", Mensagem: "" });
  const [sending, setSending] = useState(false);
  const handle = (k) => (e) => setD((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    sendToWhatsApp({ Tipo: "Dúvida Geral", ...d });
    setTimeout(() => setSending(false), 1400);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-7 w-full max-w-lg">
      <Field label="Nome" id="i-nome">
        <FInput id="i-nome" type="text" placeholder="Seu nome" value={d.Nome} onChange={handle("Nome")} required autoComplete="name" />
      </Field>
      <Field label="E-mail" id="i-email">
        <FInput id="i-email" type="email" placeholder="seu@email.com" value={d.Email} onChange={handle("Email")} required autoComplete="email" />
      </Field>
      <Field label="Mensagem" id="i-mensagem">
        <FTextarea id="i-mensagem" rows={5} placeholder="Sua mensagem…" value={d.Mensagem} onChange={handle("Mensagem")} required />
      </Field>
      <SubmitBtn sending={sending} label="Enviar mensagem" />
    </form>
  );
}

// ─── Funnel routes ───────────────────────────────────────────
const FUNNELS = [
  { id: "project",     n: "01", title: "Start a project",  sub: "Sales funnel",   headline: "Vamos construir algo extraordinário.",  Form: ProjectForm },
  { id: "application", n: "02", title: "Application",      sub: "Talent funnel",  headline: "Faça parte do nosso time.",             Form: ApplicationForm },
  { id: "inquiry",     n: "03", title: "General Inquiry",   sub: "Dúvidas gerais", headline: "Fale o que quiser.",                    Form: InquiryForm },
];

// ─── Animation variants ──────────────────────────────────────
const ease = [0.16, 1, 0.3, 1];

const sectionAnim = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3, ease } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease, delay },
});

// ─── Main component ──────────────────────────────────────────
export default function Contato() {
  const [selected, setSelected] = useState(null);
  const funnel = FUNNELS.find((f) => f.id === selected);

  return (
    <section
      id="contato"
      className="w-full relative"
      style={{
        background: CREAM,
        color: INK,
        borderRadius: "1.75rem",
        marginTop: "3rem",
      }}
    >
      {/* ── Top label ────────────────────────────────────────── */}
      <div className="px-8 md:px-12 pt-8">
        <span
          className="text-[9px] uppercase tracking-[0.35em] font-black"
          style={{ color: `${INK}44` }}
        >
          {selected ? `Contact / ${funnel.title}` : "Contact"}
        </span>
      </div>

      <div className="px-8 md:px-12 pt-10 pb-16 md:pb-24">
        {/* ── Giant heading — animated on change ────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected ?? "root"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease }}
            className="mb-10 md:mb-16"
          >
            <h2
              className="font-black tracking-[-0.04em] leading-[0.88]"
              style={{
                fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
                color: INK,
              }}
            >
              {selected ? funnel.title : "Let's\u00A0talk."}
            </h2>
            {selected && (
              <p
                className="mt-4 text-base md:text-lg font-light"
                style={{ color: `${INK}66` }}
              >
                {funnel.headline}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Main body ──────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {!selected ? (
            /* ───── MENU ───── */
            <motion.div
              key="menu"
              variants={sectionAnim}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.p
                {...slideUp(0.05)}
                className="text-sm md:text-base font-light mb-12 md:mb-16 max-w-xs"
                style={{ color: `${INK}66` }}
              >
                Escolha como podemos te ajudar.
              </motion.p>

              {/* Numbered list */}
              <nav
                className="flex flex-col"
                style={{ borderTop: `1px solid ${INK_GHOST}` }}
              >
                {FUNNELS.map((f, i) => (
                  <motion.button
                    key={f.id}
                    {...slideUp(0.1 + i * 0.07)}
                    onClick={() => setSelected(f.id)}
                    className="group flex items-center justify-between text-left transition-all duration-500 hover:pl-3 md:hover:pl-6"
                    style={{
                      padding: "1.5rem 0",
                      borderBottom: `1px solid ${INK_GHOST}`,
                    }}
                  >
                    {/* Left: number + title */}
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span
                        className="text-xs font-black tabular-nums font-mono shrink-0"
                        style={{ color: `${INK}33` }}
                      >
                        {f.n}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-5">
                        <span
                          className="font-black tracking-tight leading-none transition-colors duration-300 group-hover:text-[#965EC7]"
                          style={{
                            fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)",
                            color: INK,
                          }}
                        >
                          {f.title}
                        </span>
                        <span
                          className="text-[10px] uppercase tracking-[0.25em] font-black hidden sm:inline"
                          style={{ color: `${INK}33` }}
                        >
                          {f.sub}
                        </span>
                      </div>
                    </div>

                    {/* Arrow circle */}
                    <div
                      className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: INK_GHOST,
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = INK;
                        e.currentTarget.style.borderColor = INK;
                        e.currentTarget.querySelector("svg").style.color = CREAM;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = INK_GHOST;
                        e.currentTarget.querySelector("svg").style.color = INK;
                      }}
                    >
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{ color: INK }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.button>
                ))}
              </nav>

              {/* Footer row */}
              <motion.div
                {...slideUp(0.35)}
                className="mt-14 md:mt-20 pt-8 flex flex-col sm:flex-row gap-8 sm:gap-16"
                style={{ borderTop: `1px solid ${INK_GHOST}` }}
              >
                {[
                  { label: "E-mail",      value: "whysadmin@gmail.com",       href: "mailto:whysadmin@gmail.com" },
                  { label: "WhatsApp",    value: "+55 69 9 8116-2676",        href: `https://wa.me/${WA_NUMBER}` },
                  { label: "Localização", value: "Porto Velho, RO — Brasil",  href: null },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <p
                      className="text-[9px] uppercase tracking-[0.3em] font-black mb-1.5"
                      style={{ color: `${INK}33` }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        className="text-sm font-light transition-colors duration-200 hover:opacity-70"
                        style={{ color: INK }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-light" style={{ color: INK }}>{value}</p>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            /* ───── FORM ───── */
            <motion.div
              key={selected}
              variants={sectionAnim}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Back button */}
              <motion.button
                {...slideUp(0)}
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-sm font-semibold mb-12 group"
                style={{ color: `${INK}60` }}
                whileHover={{ x: -4, color: INK }}
              >
                <ArrowLeft
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
                Voltar
              </motion.button>

              {/* Form */}
              <motion.div {...slideUp(0.1)}>
                {funnel && <funnel.Form />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
