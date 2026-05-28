import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/LegalPage";

export const Route = createFileRoute("/aviso-previas")({
  head: () => ({
    meta: [
      { title: "Aviso sobre Prévias · Studio de IA" },
      {
        name: "description",
        content:
          "Aviso sobre as prévias comerciais apresentadas na plataforma do Studio de IA.",
      },
    ],
  }),
  component: AvisoPage,
});

function AvisoPage() {
  return (
    <LegalPage title="Aviso sobre prévias comerciais">
      <p>
        As prévias apresentadas nesta plataforma são demonstrações comerciais
        criadas pelo Studio de IA para ilustrar propostas de presença digital.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        1. Natureza da prévia
      </h2>
      <p>
        A prévia é uma simulação visual baseada em informações públicas da
        empresa e templates de design. Não representa um site publicado,
        contratado ou aprovado pelo cliente.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        2. Marcas e dados de terceiros
      </h2>
      <p>
        Nomes, marcas, logos, fotos e informações de empresas exibidas nas
        prévias pertencem a seus respectivos titulares. O uso é feito
        exclusivamente para contextualizar a proposta visual e demonstrar
        capacidade técnica.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        3. Publicação final
      </h2>
      <p>
        O site final só é publicado mediante aprovação do cliente, ajustes
        contratados e configuração de domínio oficial. Nenhuma prévia é
        disponibilizada publicamente como site oficial sem autorização
        expressa.
      </p>
    </LegalPage>
  );
}
