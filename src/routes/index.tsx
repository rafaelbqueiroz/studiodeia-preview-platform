import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Info,
  Menu,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prévia do site · Tochetto" },
      {
        name: "description",
        content:
          "Prévia exclusiva do novo site da Tochetto criada pelo Studio de IA — posicionamento premium e pedidos qualificados.",
      },
      { property: "og:title", content: "Prévia do site · Tochetto" },
      {
        property: "og:description",
        content:
          "Prévia exclusiva do novo site da Tochetto criada pelo Studio de IA.",
      },
    ],
  }),
  component: StudioPreviewShellTochettoRefinado,
});

const CLIENT = {
  name: "Tochetto",
  previewUrl: "https://tochetto.sigaseuprojeto.online/",
  logoUrl: "https://studiodeia.com.br/images/logo.svg",
  whatsapp:
    "https://wa.me/5554993461322?text=Ol%C3%A1%2C%20vi%20a%20pr%C3%A9via%20do%20site%20da%20Tochetto%20e%20quero%20conversar%20sobre%20a%20publica%C3%A7%C3%A3o.",
  objective:
    "posicionamento premium, confiança técnica e pedidos qualificados de orçamento",
};

function StudioLogo() {
  return (
    <img
      src={CLIENT.logoUrl}
      alt="Studio de IA"
      className="h-8 w-auto sm:h-9"
      draggable={false}
    />
  );
}

function DiagnosticPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const cards = [
    {
      eyebrow: "01 · Diagnóstico",
      title: "O que observamos",
      body: "A Tochetto atua em um segmento em que o cliente precisa confiar antes de pedir orçamento. Lareiras, calefação e soluções arquitetônicas envolvem segurança, estética, investimento e escolha técnica.",
    },
    {
      eyebrow: "02 · Criação",
      title: "O que foi criado",
      body: "Uma presença digital com visual premium, navegação clara, foco em produtos, tecnologia, arquitetos e contato, além de chamada direta para orçamento.",
    },
    {
      eyebrow: "03 · Resultado",
      title: "Como ajuda a vender",
      body: "Ajuda a aumentar percepção de valor, reduzir dúvidas antes do primeiro contato, gerar pedidos mais qualificados e apoiar campanhas de Google, Instagram e indicações.",
    },
    {
      eyebrow: "04 · Próximo passo",
      title: "Publicar com ajustes",
      body: "Podemos ajustar textos, imagens, WhatsApp, domínio e publicar a versão final com estrutura preparada para campanhas e SEO local.",
      accent: true,
    },
  ];

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
                  O que pensamos para a {CLIENT.name}
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

function StudioPreviewShellTochettoRefinado() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const iframeClass = useMemo(() => {
    if (mobileMode) {
      return "h-[760px] w-[390px] max-w-full rounded-[34px] border-[10px] border-black bg-white shadow-2xl shadow-black/40";
    }
    return "h-[calc(100vh-230px)] min-h-[640px] w-full rounded-lg bg-white";
  }, [mobileMode]);

  return (
    <main className="min-h-screen bg-studio-bg text-studio-text selection:bg-studio-accent selection:text-white">
      <header className="sticky top-0 z-50 border-b border-studio-border bg-studio-bg/85 backdrop-blur-2xl">
        <div className="flex h-[74px] items-center justify-between px-4 sm:px-7 lg:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <StudioLogo />
            <div className="hidden h-7 w-px bg-white/10 sm:block" />
            <div className="hidden min-w-0 sm:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
                Prévia do novo site
              </p>
              <p className="truncate text-sm font-semibold text-studio-text">
                {CLIENT.name}
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setDiagnosticOpen((value) => !value)}
              aria-expanded={diagnosticOpen}
              className="inline-flex items-center gap-2 rounded-xl border border-studio-border px-4 py-2.5 text-sm font-medium text-studio-muted transition hover:border-white/20 hover:bg-white/[0.04] hover:text-studio-text"
            >
              <Info className="h-4 w-4 text-studio-accent" />
              {diagnosticOpen ? "Ocultar análise" : "Entender o que foi feito"}
            </button>
            <a
              href={CLIENT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-studio-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_-12px_oklch(0.62_0.224_25_/_0.55)] transition hover:-translate-y-0.5 hover:bg-studio-accent-hover"
            >
              Quero conversar
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-studio-border bg-white/[0.03] text-studio-text transition hover:bg-white/[0.06] md:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <motion.div
          animate={{
            opacity: scrolled ? 0 : 1,
            height: scrolled ? 0 : "auto",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden border-t border-studio-border bg-studio-surface/60"
        >
          <div className="flex flex-col gap-3 px-4 py-3 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p className="max-w-4xl text-sm leading-relaxed text-studio-muted">
              Criamos uma proposta de site para{" "}
              <span className="font-semibold text-studio-text">{CLIENT.name}</span>{" "}
              com foco em {CLIENT.objective}.
            </p>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              Ambiente de prévia
            </p>
          </div>
        </motion.div>

        <DiagnosticPanel
          open={diagnosticOpen}
          onClose={() => setDiagnosticOpen(false)}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-[84vw] max-w-sm flex-col border-l border-studio-border bg-studio-bg p-5 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <StudioLogo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-studio-border p-2 text-studio-muted transition hover:bg-white/5 hover:text-studio-text"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => {
                  setDiagnosticOpen(true);
                  setMenuOpen(false);
                }}
                className="mb-3 rounded-2xl border border-studio-border bg-white/[0.02] px-4 py-4 text-left text-sm font-semibold text-studio-text transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                Entender o que foi feito
              </button>
              <button
                onClick={() => {
                  setMobileMode((value) => !value);
                  setMenuOpen(false);
                }}
                className="mb-3 rounded-2xl border border-studio-border bg-white/[0.02] px-4 py-4 text-left text-sm font-semibold text-studio-text transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                Alternar desktop/mobile
              </button>
              <a
                href={CLIENT.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-3 rounded-2xl border border-studio-border bg-white/[0.02] px-4 py-4 text-sm font-semibold text-studio-text transition hover:border-white/15 hover:bg-white/[0.05]"
              >
                Abrir site em nova aba
              </a>
              <a
                href={CLIENT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-auto rounded-2xl bg-studio-accent px-4 py-4 text-center text-sm font-semibold text-white transition hover:bg-studio-accent-hover"
              >
                Quero conversar
              </a>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      <section className="px-3 py-4 sm:px-7 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 rounded-3xl border border-studio-border bg-white/[0.025] p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
              Visualização do site proposto
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-studio-text sm:text-xl">
              {CLIENT.name} · experiência do cliente final
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[11px] font-medium text-amber-200">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
              </span>
              Prévia · domínio final após aprovação
            </div>
            <div
              role="tablist"
              aria-label="Modo de visualização"
              className="inline-flex items-center gap-1 rounded-xl border border-studio-border bg-white/[0.02] p-1"
            >
              <button
                role="tab"
                aria-selected={!mobileMode}
                onClick={() => setMobileMode(false)}
                className={
                  !mobileMode
                    ? "inline-flex items-center gap-2 rounded-lg bg-studio-text px-3 py-2 text-sm font-semibold text-studio-bg shadow-sm"
                    : "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-studio-muted transition hover:bg-white/[0.05] hover:text-studio-text"
                }
              >
                <Monitor className="h-4 w-4" />
                Desktop
              </button>
              <button
                role="tab"
                aria-selected={mobileMode}
                onClick={() => setMobileMode(true)}
                className={
                  mobileMode
                    ? "inline-flex items-center gap-2 rounded-lg bg-studio-text px-3 py-2 text-sm font-semibold text-studio-bg shadow-sm"
                    : "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-studio-muted transition hover:bg-white/[0.05] hover:text-studio-text"
                }
              >
                <Smartphone className="h-4 w-4" />
                Mobile
              </button>
            </div>
            <a
              href={CLIENT.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-studio-border px-3 py-2 text-sm font-medium text-studio-muted transition hover:border-white/20 hover:bg-white/[0.05] hover:text-studio-text"
            >
              Nova aba
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative flex justify-center overflow-hidden rounded-xl border border-studio-border bg-studio-surface p-2 shadow-2xl shadow-black/30">

          <AnimatePresence>
            {!iframeLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-[5] flex items-center justify-center bg-studio-surface"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-studio-accent" />
                  <p className="text-sm font-medium text-studio-muted">
                    Carregando prévia da {CLIENT.name}...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key={mobileMode ? "mobile" : "desktop"}
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full justify-center"
          >
            <iframe
              title="Prévia do site Tochetto"
              src={CLIENT.previewUrl}
              onLoad={() => setIframeLoaded(true)}
              className={iframeClass}
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-28 pt-3 sm:px-7 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-studio-accent/25 bg-gradient-to-br from-studio-accent-soft via-studio-accent-soft/40 to-transparent p-6 text-center shadow-[0_24px_70px_-30px_rgba(0,0,0,0.6)] sm:p-12"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-studio-accent/20 blur-3xl" />
          <div className="relative">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent-hover">
              Próximo passo
            </p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-studio-text sm:text-4xl">
              Gostou da direção?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-studio-muted">
              Podemos transformar este preview em um site publicado, com domínio
              próprio, WhatsApp, ajustes finais e estrutura pronta para
              campanhas.
            </p>
            <a
              href={CLIENT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-studio-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_42px_-14px_oklch(0.62_0.224_25_/_0.7)] transition hover:-translate-y-0.5 hover:bg-studio-accent-hover"
            >
              Quero conversar sobre este site
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </section>

      <a
        href={CLIENT.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-2xl bg-studio-accent px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_-14px_oklch(0.62_0.224_25_/_0.7)] transition hover:-translate-y-0.5 hover:bg-studio-accent-hover"
      >
        Quero conversar
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </main>
  );
}
