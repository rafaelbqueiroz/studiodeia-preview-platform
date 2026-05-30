import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllSlugs } from "../data/previews";
import { ArrowUpRight } from "lucide-react";
import { StudioLogo } from "../components/preview/StudioLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio de IA · Plataforma de Prévia Estratégica" },
      {
        name: "description",
        content:
          "Plataforma do Studio de IA para apresentação de prévias estratégicas de sites criados para negócios locais.",
      },
    ],
  }),
  component: PlatformLanding,
});

const previews = getAllSlugs();

function PlatformLanding() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-studio-bg px-4 text-center">
      <div className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <StudioLogo logoUrl="https://studiodeia.com.br/images/logo.svg" />
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-studio-text">
          Prévia Estratégica
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-studio-muted">
          Plataforma para apresentação de prévias personalizadas de sites criados
          pelo Studio de IA para negócios locais.
        </p>

        {previews.length > 0 && (
          <div className="mt-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-studio-subtle">
              Previews disponíveis
            </p>
            <div className="flex flex-col gap-2">
              {previews.map((p) => (
                <Link
                  key={p.slug}
                  to={"/$slug"}
                  params={{ slug: p.slug }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-studio-border bg-white/[0.03] px-5 py-3 text-sm font-semibold text-studio-text transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-studio-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
