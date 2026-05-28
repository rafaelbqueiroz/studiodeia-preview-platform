import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/LegalPage";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso · Studio de IA" },
      {
        name: "description",
        content:
          "Termos de uso da plataforma de prévias do Studio de IA — condições de uso e responsabilidades.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Termos de Uso">
      <p>
        Ao acessar esta plataforma de prévias, você declara ter lido e
        aceitado estes termos. As prévias apresentadas são demonstrações
        comerciais e não representam versões finais publicadas.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        1. Propriedade intelectual
      </h2>
      <p>
        Os templates, diagnósticos e propostas visuais apresentados são de
        propriedade do Studio de IA. O cliente não adquire qualquer direito
        sobre o material sem a contratação formal dos serviços.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        2. Uso de marcas e informações
      </h2>
      <p>
        As marcas, logos e informações de empresas exibidas nas prévias são
        utilizados exclusivamente para contextualizar a proposta visual. A
        publicação final depende de autorização expressa da empresa.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        3. Limitação de responsabilidade
      </h2>
      <p>
        O Studio de IA não se responsabiliza por decisões comerciais tomadas
        com base nas prévias apresentadas. O serviço contratado é regido por
        contrato específico firmado entre as partes.
      </p>
    </LegalPage>
  );
}
