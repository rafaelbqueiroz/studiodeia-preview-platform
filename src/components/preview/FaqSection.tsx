import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Este site já está publicado oficialmente?",
    a: "Não. Esta é uma prévia visual criada para você avaliar a proposta. A publicação final só acontece após aprovação.",
  },
  {
    q: "Posso pedir alterações?",
    a: "Sim. Textos, imagens, WhatsApp, produtos e seções podem ser ajustados antes da publicação.",
  },
  {
    q: "Preciso contratar para ver a prévia?",
    a: "Não. Esta demonstração foi criada para você avaliar a proposta sem nenhum compromisso.",
  },
  {
    q: "O site pode ir para o meu domínio?",
    a: "Sim. Após aprovação, configuramos o domínio oficial da empresa e cuidamos da publicação.",
  },
  {
    q: "Quem criou esta prévia?",
    a: "O Studio de IA, operação especializada em presença digital, IA e automação para negócios locais, conduzida por Rafa Queiroz.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 pt-12 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent">
          Perguntas frequentes
        </p>
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-studio-text sm:text-3xl">
          Antes de qualquer decisão
        </h2>
        <div className="overflow-hidden rounded-3xl border border-studio-border bg-white/[0.02]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={
                  i > 0 ? "border-t border-studio-border" : undefined
                }
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.02]"
                >
                  <span className="text-sm font-semibold text-studio-text">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={
                      "h-4 w-4 shrink-0 text-studio-muted transition " +
                      (isOpen ? "rotate-180 text-studio-accent" : "")
                    }
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-studio-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
