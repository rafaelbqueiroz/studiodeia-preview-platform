import type { PreviewClient } from "../../data/previews";
import { StudioLogo } from "./StudioLogo";

interface PreviewFooterProps {
  client: PreviewClient;
}

export function PreviewFooter({ client }: PreviewFooterProps) {
  return (
    <footer className="border-t border-studio-border bg-studio-surface px-4 py-12 sm:px-7 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <StudioLogo logoUrl={client.logoUrl} />
            </div>
            <p className="text-xs leading-relaxed text-studio-muted">
              Estratégia, IA e presença digital para negócios locais.
              <br />
              Apresentação conduzida por{" "}
              <span className="font-semibold text-studio-text">
                Rafa Queiroz
              </span>
              .
            </p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
              Dados institucionais
            </p>
            <p className="text-xs leading-relaxed text-studio-muted">
              Studio de IA Consultoria de Tecnologia da Informação Ltda
            </p>
            <p className="text-xs leading-relaxed text-studio-muted">
              CNPJ 60.398.053/0001-34
            </p>
            <p className="mt-2 text-xs leading-relaxed text-studio-muted">
              Av. Carlos Gomes, 700 — Sala 606, 5º Andar
              <br />
              Boa Vista, Porto Alegre — RS, 90480-000
            </p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-studio-subtle">
              Contato
            </p>
            <a
              href={client.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block text-xs leading-relaxed text-studio-muted transition hover:text-studio-text"
            >
              WhatsApp comercial
            </a>
            <a
              href="mailto:contato@studiodeia.com.br"
              className="block text-xs leading-relaxed text-studio-muted transition hover:text-studio-text"
            >
              contato@studiodeia.com.br
            </a>
            <a
              href="https://studiodeia.com.br"
              target="_blank"
              rel="noreferrer"
              className="block text-xs leading-relaxed text-studio-muted transition hover:text-studio-text"
            >
              studiodeia.com.br
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-studio-border bg-white/[0.02] p-4">
          <p className="text-[11px] leading-relaxed text-studio-subtle">
            <span className="font-semibold text-studio-muted">
              Aviso sobre prévias comerciais.
            </span>
            <br />
            As prévias apresentadas nesta plataforma são demonstrações
            comerciais. Marcas, nomes e informações podem ser usados apenas
            para contextualizar a proposta visual. A publicação final depende
            de aprovação da empresa.
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-studio-border pt-6 sm:flex-row">
          <p className="text-[11px] text-studio-subtle">
            &copy; {new Date().getFullYear()} Studio de IA. Todos os direitos
            reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-studio-muted">
            <a href="/privacidade" className="transition hover:text-studio-text">
              Politica de Privacidade
            </a>
            <a href="/termos" className="transition hover:text-studio-text">
              Termos de Uso
            </a>
            <a href="/aviso-previas" className="transition hover:text-studio-text">
              Aviso sobre previas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
