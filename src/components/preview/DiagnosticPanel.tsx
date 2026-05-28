import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface DiagnosticCard {
  eyebrow: string;
  title: string;
  body: string;
  accent?: boolean;
}

interface DiagnosticPanelProps {
  open: boolean;
  clientName: string;
  cards: DiagnosticCard[];
  onClose?: () => void;
}

export function DiagnosticPanel({
  open,
  clientName,
  cards,
  onClose,
}: DiagnosticPanelProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-studio-border bg-studio-surface"
        >
          <div className="px-4 py-7 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent">
                  Análise estratégica
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-studio-text sm:text-2xl">
                  O que pensamos para a {clientName}
                </h2>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-xl border border-studio-border p-2 text-studio-muted transition hover:bg-white/5 hover:text-studio-text md:hidden"
                  aria-label="Fechar diagnóstico"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map((card, i) => (
                <motion.article
                  key={card.eyebrow}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
                  className={
                    card.accent
                      ? "group rounded-3xl border border-studio-accent/30 bg-studio-accent-soft p-5 transition hover:border-studio-accent/50"
                      : "group rounded-3xl border border-studio-border bg-white/[0.02] p-5 transition hover:border-white/15 hover:bg-white/[0.04]"
                  }
                >
                  <p
                    className={
                      card.accent
                        ? "mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent-hover"
                        : "mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent"
                    }
                  >
                    {card.eyebrow}
                  </p>
                  <h3 className="mb-2 text-base font-semibold text-studio-text">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-studio-muted">
                    {card.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
