import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-studio-bg text-studio-text">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-studio-muted transition hover:text-studio-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao preview
        </Link>
        <h1 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed text-studio-muted">
          {children}
        </div>
        <div className="mt-12 border-t border-studio-border pt-6">
          <p className="text-[11px] text-studio-subtle">
            Studio de IA Consultoria de Tecnologia da Informação Ltda
            &middot; CNPJ 60.398.053/0001-34
          </p>
        </div>
      </div>
    </main>
  );
}
