import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "../components/LegalPage";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade · Studio de IA" },
      {
        name: "description",
        content:
          "Política de privacidade do Studio de IA — como tratamos seus dados durante a apresentação de prévias comerciais.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Política de Privacidade">
      <p>
        O Studio de IA valoriza a privacidade dos seus clientes e visitantes.
        Esta política descreve como coletamos, usamos e protegemos as
        informações obtidas durante a apresentação de prévias comerciais e
        prestação de serviços.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        1. Dados coletados
      </h2>
      <p>
        Coletamos informações fornecidas voluntariamente, como nome, telefone,
        e-mail e WhatsApp, além de dados públicos de empresas obtidos via Google
        Maps, Google Business Profile e sites institucionais para fins de
        prospecção e criação de propostas comerciais.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        2. Uso dos dados
      </h2>
      <p>
        Os dados são utilizados exclusivamente para: (a) criar e apresentar
        prévias de sites; (b) entrar em contato para propostas comerciais; (c)
        prestar serviços contratados de presença digital; (d) gerar relatórios
        de desempenho. Não compartilhamos dados com terceiros sem autorização.
      </p>

      <h2 className="text-base font-semibold text-studio-text">
        3. Direitos do titular
      </h2>
      <p>
        Você pode solicitar a qualquer momento a correção, exclusão ou
        portabilidade dos seus dados entrando em contato pelo e-mail{" "}
        <a
          href="mailto:contato@studiodeia.com.br"
          className="text-studio-accent underline transition hover:text-studio-accent-hover"
        >
          contato@studiodeia.com.br
        </a>
        .
      </p>
    </LegalPage>
  );
}
