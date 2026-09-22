// Pagina privada: o aplicativo da camera em si.
//
// Esta pagina so abre para quem esta logado - quem cuida disso e a
// RotaPrivada, no App.jsx.
//
// Aqui ficam as rotas de dentro do aplicativo (/app, /app/estudo, e assim
// por diante) e a moldura do celular, que e a mesma em todas elas. As
// informacoes vem dos hooks customizados e descem para as telas por props.

import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import BarraSuperior from "../componentes/BarraSuperior.jsx";
import Cabecalho from "../componentes/Cabecalho.jsx";
import Rodape from "../componentes/Rodape.jsx";
import BarraDeModos from "../componentes/BarraDeModos.jsx";
import Aviso from "../componentes/Aviso.jsx";
import TelaCamera from "../componentes/TelaCamera.jsx";
import TelaEstudo from "../componentes/TelaEstudo.jsx";
import TelaLousa from "../componentes/TelaLousa.jsx";
import TelaDigitalizar from "../componentes/TelaDigitalizar.jsx";
import TelaPdf from "../componentes/TelaPdf.jsx";
import TelaAcessibilidade from "../componentes/TelaAcessibilidade.jsx";

import { useBiblioteca } from "../hooks/useBiblioteca.js";
import { useConteudos } from "../hooks/useConteudos.js";
import { useComandoDeVoz } from "../hooks/useComandoDeVoz.js";
import { calcularMediaDeConfianca } from "../funcoes.js";

// Cada modo do aplicativo tem um endereco proprio. Este objeto liga o nome
// do modo ao endereco dele.
const enderecoDoModo = {
  camera: "/app",
  estudo: "/app/estudo",
  lousa: "/app/lousa",
  digitalizar: "/app/digitalizar",
  pdf: "/app/arquivos",
  acessibilidade: "/app/acessibilidade",
};

// O texto que aparece no alto da tela em cada modo.
const situacoes = {
  camera: "CAMERA",
  estudo: "LENDO O QUE VOCE APONTA",
  lousa: "SCANNER DE LOUSA",
  digitalizar: "DIGITALIZAR DOCUMENTO",
  pdf: "ARQUIVOS SALVOS",
  acessibilidade: "ACESSIBILIDADE",
};

// Descobre qual modo esta aberto olhando o endereco atual do navegador.
function descobrirModo(caminho) {
  if (caminho.startsWith("/app/estudo")) {
    return "estudo";
  }
  if (caminho.startsWith("/app/lousa")) {
    return "lousa";
  }
  if (caminho.startsWith("/app/digitalizar")) {
    return "digitalizar";
  }
  if (caminho.startsWith("/app/arquivos")) {
    return "pdf";
  }
  if (caminho.startsWith("/app/acessibilidade")) {
    return "acessibilidade";
  }
  return "camera";
}

function Aplicativo({
  usuario,
  aoSair,
  config,
  aoMudarConfig,
  aviso,
  mostrarAviso,
  integrantes,
  turma,
}) {
  const navegar = useNavigate();
  const localizacao = useLocation();

  const modoAtual = descobrirModo(localizacao.pathname);

  // Os documentos salvos e o acervo de textos vem dos hooks customizados.
  const {
    biblioteca,
    criarCodigoNovo,
    salvarNaBiblioteca,
    salvarPdf,
    removerDaBiblioteca,
    limparBiblioteca,
  } = useBiblioteca(mostrarAviso);

  const { conteudos, carregando, erro } = useConteudos();

  // O PDF que acabou de ser gerado e ainda esta na tela.
  const [documentoGerado, setDocumentoGerado] = useState(null);

  // Troca de modo mudando o endereco do navegador.
  function trocarTela(modo) {
    navegar(enderecoDoModo[modo] || "/app");
  }

  // O comando de voz tambem navega, usando a mesma funcao.
  useComandoDeVoz({
    ligado: config.comandoDeVoz,
    aoEntenderModo: trocarTela,
    mostrarAviso: mostrarAviso,
  });

  // Quando o PDF fica pronto, o aplicativo leva o usuario para a tela do
  // arquivo gerado.
  function receberPdf(documento) {
    setDocumentoGerado({ ...documento, codigo: criarCodigoNovo() });
    navegar("/app/arquivos");
    mostrarAviso("PDF gerado: " + documento.arquivo, "certo");
  }

  // Troca o nome do arquivo PDF que esta na tela.
  function renomearPdf(novoNome) {
    setDocumentoGerado({ ...documentoGerado, arquivo: novoNome });
  }

  function limparTudo() {
    limparBiblioteca();
    setDocumentoGerado(null);
  }

  return (
    <div className={config.altoContraste ? "aplicativo contraste" : "aplicativo"}>
      <BarraSuperior usuario={usuario} aoSair={aoSair} />

      <div className="aparelho">
        <span className="camera-frontal"></span>

        <main className="celular">
          <Cabecalho
            situacao={situacoes[modoAtual]}
            aoAbrirArquivos={() => trocarTela("pdf")}
          />

          <div className="corpo">
            {carregando && <p className="aviso">Carregando o acervo do servidor...</p>}

            {erro && <p className="aviso aviso-atencao">{erro}</p>}

            <Routes>
              <Route
                index
                element={
                  <TelaCamera
                    aoTrocarTela={trocarTela}
                    totalSalvos={biblioteca.length}
                    mediaDeAcerto={calcularMediaDeConfianca(biblioteca)}
                    mostrarAviso={mostrarAviso}
                  />
                }
              />

              <Route
                path="estudo"
                element={
                  <TelaEstudo
                    textos={conteudos.livro}
                    velocidade={config.velocidade}
                    volume={config.volume}
                    leituraAutomatica={config.leituraAutomatica}
                    aoSalvarNaBiblioteca={salvarNaBiblioteca}
                  />
                }
              />

              <Route
                path="lousa"
                element={
                  <TelaLousa
                    textos={conteudos.lousa}
                    velocidade={config.velocidade}
                    volume={config.volume}
                    leituraAutomatica={config.leituraAutomatica}
                    aoSalvarNaBiblioteca={salvarNaBiblioteca}
                  />
                }
              />

              <Route
                path="digitalizar"
                element={
                  <TelaDigitalizar
                    documentos={conteudos.documentos}
                    aoGerarPdf={receberPdf}
                  />
                }
              />

              <Route
                path="arquivos"
                element={
                  <TelaPdf
                    documento={documentoGerado}
                    biblioteca={biblioteca}
                    aoSalvarPdf={salvarPdf}
                    aoRemover={removerDaBiblioteca}
                    aoTrocarTela={trocarTela}
                    aoRenomear={renomearPdf}
                    velocidade={config.velocidade}
                    volume={config.volume}
                    mostrarAviso={mostrarAviso}
                  />
                }
              />

              <Route
                path="acessibilidade"
                element={
                  <TelaAcessibilidade
                    config={config}
                    aoMudarConfig={aoMudarConfig}
                    aoLimparBiblioteca={limparTudo}
                    totalSalvos={biblioteca.length}
                    usuario={usuario}
                  />
                }
              />

              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </div>

          <BarraDeModos telaAtual={modoAtual} aoTrocarTela={trocarTela} />

          <Aviso texto={aviso.texto} tipo={aviso.tipo} />
        </main>

        <div className="barra-android">
          <span className="android-voltar"></span>
          <span className="android-inicio"></span>
          <span className="android-recentes"></span>
        </div>
      </div>

      <Rodape integrantes={integrantes} turma={turma} />
    </div>
  );
}

export default Aplicativo;
