import { useParams, useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Info, Menu, MessageSquare, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { getPreviewBySlug, type PreviewClient } from "../data/previews";
import { StudioLogo } from "../components/preview/StudioLogo";
import { DiagnosticPanel } from "../components/preview/DiagnosticPanel";
import { FaqSection } from "../components/preview/FaqSection";
import { PreviewFooter } from "../components/preview/PreviewFooter";

export const Route = createFileRoute("/$slug")({
  head: ({ params }) => {
    const client = getPreviewBySlug(params.slug);
    if (!client) {
      return {
        meta: [
          { title: "Preview não encontrado · Studio de IA" },
          { name: "description", content: "O preview solicitado não foi encontrado." },
        ],
      };
    }
    return {
      meta: [
        { title: `Prévia do site · ${client.name}` },
        {
          name: "description",
          content: `Prévia exclusiva do novo site da ${client.name} criada pelo Studio de IA — ${client.objective}.`,
        },
        { property: "og:title", content: `Prévia do site · ${client.name}` },
        {
          property: "og:description",
          content: `Prévia exclusiva do novo site da ${client.name} criada pelo Studio de IA.`,
        },
      ],
    };
  },
  component: DynamicPreview,
});

function DynamicPreview() {
  const { slug } = useParams({ from: Route.id });
  const router = useRouter();
  const client = getPreviewBySlug(slug);

  if (!client) {
    return <NotFound slug={slug} />;
  }

  return <PreviewShell client={client} />;
}

function NotFound({ slug }: { slug: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-studio-bg px-4 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent">
        Studio de IA
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-studio-text">
        Preview não encontrado
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-studio-muted">
        Não encontramos um preview para &ldquo;{slug}&rdquo;. O link pode estar
        incorreto ou o preview pode ter sido removido.
      </p>
    </main>
  );
}

function PreviewShell({ client }: { client: PreviewClient }) {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [mobileMode, setMobileMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  });
  const [userToggled, setUserToggled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!userToggled) setMobileMode(e.matches);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [userToggled]);

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
      return "h-[70vh] min-h-[560px] max-h-[760px] w-full max-w-[390px] rounded-[34px] border-[8px] sm:border-[10px] border-black bg-white shadow-2xl shadow-black/40";
    }
    return "h-[calc(100vh-230px)] min-h-[520px] w-full rounded-lg bg-white";
  }, [mobileMode]);

  const CHIPS = [
    "Foco em conversão",
    "WhatsApp integrado",
    "SEO local básico",
    "Design responsivo",
    "Domínio próprio",
  ];

  return (
    <main className="min-h-screen bg-studio-bg text-studio-text selection:bg-studio-accent selection:text-white">
      {/* header */}
      <header className="sticky top-0 z-50 border-b border-studio-border bg-studio-bg/85 backdrop-blur-2xl">
        <div className="flex h-[74px] items-center justify-between px-4 sm:px-7 lg:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <StudioLogo logoUrl={client.logoUrl} />
            <div className="hidden h-7 w-px bg-white/10 sm:block" />
            <div className="hidden min-w-0 sm:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
                Prévia do novo site
              </p>
              <p className="truncate text-sm font-semibold text-studio-text">
                {client.name}
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setDiagnosticOpen((v) => !v)}
              aria-expanded={diagnosticOpen}
              className="inline-flex items-center gap-2 rounded-xl border border-studio-border px-4 py-2.5 text-sm font-medium text-studio-muted transition hover:border-white/20 hover:bg-white/[0.04] hover:text-studio-text"
            >
              <Info className="h-4 w-4 text-studio-accent" />
              {diagnosticOpen ? "Ocultar análise" : "Entender o que foi feito"}
            </button>
            <a
              href={client.whatsapp}
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

        {/* context bar */}
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
              <span className="font-semibold text-studio-text">{client.name}</span>{" "}
              com foco em {client.objective}.
            </p>
            <p className="flex shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
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
          clientName={client.name}
          cards={client.diagnosisCards}
          onClose={() => setDiagnosticOpen(false)}
        />
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex h-full w-[84vw] max-w-sm flex-col border-l border-studio-border bg-studio-bg p-5 shadow-2xl md:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <StudioLogo logoUrl={client.logoUrl} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-studio-border p-2 text-studio-muted transition hover:bg-white/5 hover:text-studio-text"
                  aria-label="Fechar menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setDiagnosticOpen((v) => !v);
                  }}
                  className="inline-flex items-center gap-3 rounded-xl border border-studio-border px-4 py-3 text-sm font-medium text-studio-muted transition hover:border-white/20 hover:bg-white/[0.04] hover:text-studio-text"
                >
                  <Info className="h-4 w-4 text-studio-accent" />
                  {diagnosticOpen ? "Ocultar análise" : "Entender o que foi feito"}
                </button>

                <a
                  href={client.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-studio-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-studio-accent-hover"
                >
                  <MessageSquare className="h-4 w-4" />
                  Quero conversar sobre este preview
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* viewport controls */}
      <div className="flex items-center justify-between border-b border-studio-border px-4 py-3 sm:px-7 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-lg border border-studio-border bg-white/[0.02] p-1">
            <button
              onClick={() => {
                setMobileMode(false);
                setUserToggled(true);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                !mobileMode
                  ? "bg-white/10 text-studio-text shadow-sm"
                  : "text-studio-muted hover:text-studio-text"
              }`}
            >
              <Monitor className="mr-1.5 inline-block h-3.5 w-3.5" />
              Desktop
            </button>
            <button
              onClick={() => {
                setMobileMode(true);
                setUserToggled(true);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                mobileMode
                  ? "bg-white/10 text-studio-text shadow-sm"
                  : "text-studio-muted hover:text-studio-text"
              }`}
            >
              <Smartphone className="mr-1.5 inline-block h-3.5 w-3.5" />
              Mobile
            </button>
          </div>
          <p className="hidden text-[11px] text-studio-subtle sm:block">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-studio-border/50 px-2.5 py-1">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/60 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              Prévia · domínio final após aprovação
            </span>
          </p>
        </div>
      </div>

      {/* iframe area */}
      <div className="flex justify-center px-4 py-6 sm:px-7 lg:px-8">
        <div className={`relative ${iframeClass}`}>
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/5">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-studio-accent border-t-transparent" />
                <p className="text-xs text-studio-muted">Carregando preview...</p>
              </div>
            </div>
          )}
          <iframe
            src={client.previewUrl}
            className="h-full w-full rounded-inherit"
            title={`Preview do site da ${client.name}`}
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            loading="lazy"
          />
          {/* Preview badge overlay */}
          <div className="pointer-events-none absolute left-2 top-2 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/25 px-2.5 py-1 text-[10px] font-medium text-amber-300/90 backdrop-blur-sm">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/60 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              Prévia · site ainda não publicado
            </span>
          </div>
        </div>
      </div>

      {/* Como funciona */}
      <section className="border-t border-studio-border px-4 pt-12 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent">
            Como funciona
          </p>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-studio-text sm:text-3xl">
            Da prévia à publicação
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { step: "01", title: "Análise", desc: "Identificamos oportunidades de melhoria na presença digital do negócio." },
              { step: "02", title: "Prévia", desc: "Criamos uma demonstração visual personalizada para avaliação." },
              { step: "03", title: "Publicação", desc: "Após ajustes e aprovação, publicamos no domínio oficial com suporte contínuo." },
            ].map((s) => (
              <div key={s.step} className="rounded-3xl border border-studio-border bg-white/[0.02] p-6">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-accent">{s.step}</p>
                <h3 className="mb-2 text-base font-semibold text-studio-text">{s.title}</h3>
                <p className="text-sm leading-relaxed text-studio-muted">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {CHIPS.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-studio-border/50 px-3 py-1.5 text-[11px] font-medium text-studio-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-studio-accent" />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      {/* CTA final */}
      <section className="px-4 pb-28 pt-10 sm:px-7 lg:px-8">
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
              próprio, WhatsApp, ajustes finais e estrutura pronta para campanhas.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={client.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-studio-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_42px_-14px_oklch(0.62_0.224_25_/_0.7)] transition hover:-translate-y-0.5 hover:bg-studio-accent-hover"
              >
                Quero conversar sobre este site
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={client.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-studio-border bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-studio-text transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <MessageSquare className="h-4 w-4 text-studio-accent" />
                Solicitar ajustes na prévia
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-studio-subtle">
              Esta é uma prévia comercial criada pelo Studio de IA para
              demonstrar uma proposta de presença digital para a {client.name}.
              O site final só é publicado após aprovação, ajustes e
              configuração do domínio oficial.
            </p>
          </div>
        </motion.div>
      </section>

      <PreviewFooter client={client} />

      {/* WhatsApp float */}
      <a
        href={client.whatsapp}
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
