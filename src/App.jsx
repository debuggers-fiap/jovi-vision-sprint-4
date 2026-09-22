// Componente PAI do aplicativo.
// E aqui que ficam guardadas todas as informacoes.
// Os componentes filhos apenas recebem essas informacoes por props.

import { useState, useEffect, useRef } from "react";

import BarraSuperior from "./componentes/BarraSuperior.jsx";
import Cabecalho from "./componentes/Cabecalho.jsx";
import Rodape from "./componentes/Rodape.jsx";
import BarraDeModos from "./componentes/BarraDeModos.jsx";
import Aviso from "./componentes/Aviso.jsx";
import TelaLogin from "./componentes/TelaLogin.jsx";
import TelaCamera from "./componentes/TelaCamera.jsx";
import TelaEstudo from "./componentes/TelaEstudo.jsx";
import TelaLousa from "./componentes/TelaLousa.jsx";
import TelaDigitalizar from "./componentes/TelaDigitalizar.jsx";
import TelaPdf from "./componentes/TelaPdf.jsx";
import TelaAcessibilidade from "./componentes/TelaAcessibilidade.jsx";

import { salvarNoNavegador, lerDoNavegador, apagarDoNavegador } from "./armazenamento.js";
import { criarOuvinte, navegadorSabeOuvir } from "./comandoDeVoz.js";
import { pararDeFalar } from "./voz.js";
import {
  gerarCodigo,
  dataDeAgora,
  estimarTamanhoDoPdf,
  calcularMediaDeConfianca,
} from "./funcoes.js";

// Dados fixos da equipe, passados para o rodape
const integrantes = [
  { nome: "Enrico Vieira de Almeida Vidal", rm: "RM569217" },
  { nome: "Vinicius Fuentes Cavalcanti", rm: "RM570818" },
  { nome: "Thiago Fernandes Kulesza", rm: "RM568922" },
  { nome: "Guilherme De Rosa Peres", rm: "RM569193" },
];

// Configuracoes que valem quando o usuario abre o app pela primeira vez
const configPadrao = {
  leituraAutomatica: true,
  velocidade: 1,
  volume: 80,
  altoContraste: false,
  // O comando de voz comeca desligado de proposito: liga-lo faz o navegador
  // pedir permissao para usar o microfone, e isso so deve acontecer quando
  // o usuario escolher usar a funcao.
  comandoDeVoz: false,
  modoOffline: false,
};

// Texto que aparece no alto da tela em cada modo
const situacoes = {
  camera: "CAMERA",
  estudo: "LENDO O QUE VOCE APONTA",
  lousa: "SCANNER DE LOUSA",
  digitalizar: "DIGITALIZAR DOCUMENTO",
  pdf: "ARQUIVOS SALVOS",
  acessibilidade: "ACESSIBILIDADE",
};

function App() {
  // Le do localStorage o que ja estava guardado da ultima vez
  const [usuario, setUsuario] = useState(lerDoNavegador("jovi_usuario", null));
  const [config, setConfig] = useState(lerDoNavegador("jovi_config", configPadrao));
  const [biblioteca, setBiblioteca] = useState(lerDoNavegador("jovi_biblioteca", []));

  const [telaAtual, setTelaAtual] = useState("camera");
  const [documentoGerado, setDocumentoGerado] = useState(null);

  // Mensagem curta que aparece embaixo confirmando a ultima acao.
  const [aviso, setAviso] = useState({ texto: "", tipo: "certo" });
  const ouvinteRef = useRef(null);

  // Sempre que as configuracoes mudarem, grava no navegador
  useEffect(() => {
    salvarNoNavegador("jovi_config", config);
  }, [config]);

  // Sempre que a biblioteca mudar, grava no navegador
  useEffect(() => {
    salvarNoNavegador("jovi_biblioteca", biblioteca);
  }, [biblioteca]);

  function mostrarAviso(texto, tipo) {
    setAviso({ texto: texto, tipo: tipo || "certo" });
  }

  // O aviso some sozinho depois de alguns segundos.
  useEffect(() => {
    if (!aviso.texto) {
      return;
    }
    const relogio = setTimeout(() => setAviso({ texto: "", tipo: "certo" }), 3500);
    return () => clearTimeout(relogio);
  }, [aviso]);

  // Liga e desliga o comando de voz conforme a chave de Acessibilidade.
  useEffect(() => {
    if (!config.comandoDeVoz) {
      return;
    }

    if (!navegadorSabeOuvir()) {
      mostrarAviso("Este navegador nao reconhece comandos de voz.", "atencao");
      return;
    }

    const ouvinte = criarOuvinte(
      (tela, frase) => {
        setTelaAtual(tela);
        mostrarAviso('Entendi: "' + frase + '"', "certo");
      },
      (frase) => {
        mostrarAviso('Nao entendi: "' + frase + '"', "atencao");
      }
    );

    // Se o navegador parar de ouvir sozinho, comeca a ouvir de novo.
    ouvinte.onend = () => {
      if (ouvinteRef.current === ouvinte) {
        ouvinte.start();
      }
    };

    ouvinte.onerror = () => {
      mostrarAviso("Nao consegui usar o microfone. Verifique a permissao.", "atencao");
    };

    ouvinteRef.current = ouvinte;
    ouvinte.start();

    // Ao desligar a chave (ou fechar o app), para de ouvir.
    return () => {
      ouvinteRef.current = null;
      ouvinte.onend = null;
      ouvinte.stop();
    };
  }, [config.comandoDeVoz]);

  function entrar(dadosDoUsuario) {
    setUsuario(dadosDoUsuario);
    salvarNoNavegador("jovi_usuario", dadosDoUsuario);
    setTelaAtual("camera");
  }

  function sair() {
    pararDeFalar();
    setUsuario(null);
    apagarDoNavegador("jovi_usuario");
  }

  function trocarTela(novaTela) {
    setTelaAtual(novaTela);
  }

  function mudarConfig(chave, valor) {
    setConfig({ ...config, [chave]: valor });
  }

  // Sorteia um codigo que ainda nao esteja sendo usado na biblioteca,
  // para que dois itens diferentes nunca fiquem com o mesmo codigo
  function criarCodigoNovo() {
    let codigo = gerarCodigo();
    while (biblioteca.find((item) => item.codigo === codigo)) {
      codigo = gerarCodigo();
    }
    return codigo;
  }

  // Guarda na biblioteca um texto reconhecido no Modo Estudo ou na Lousa
  function salvarNaBiblioteca(resultado) {
    const novoItem = {
      codigo: criarCodigoNovo(),
      titulo: resultado.titulo,
      texto: resultado.texto,
      confianca: resultado.confianca,
      tamanho: estimarTamanhoDoPdf(resultado.texto),
      data: dataDeAgora(),
    };
    setBiblioteca([novoItem, ...biblioteca]);
  }

  // Guarda na biblioteca o PDF que acabou de ser gerado
  function salvarPdf(documento) {
    const novoItem = { ...documento, data: dataDeAgora() };
    setBiblioteca([novoItem, ...biblioteca]);
    mostrarAviso("PDF guardado na biblioteca", "certo");
  }

  // Troca o nome do arquivo PDF que esta na tela
  function renomearPdf(novoNome) {
    setDocumentoGerado({ ...documentoGerado, arquivo: novoNome });
  }

  function removerDaBiblioteca(codigo) {
    const restantes = biblioteca.filter((item) => item.codigo !== codigo);
    setBiblioteca(restantes);
    mostrarAviso("Item removido da biblioteca", "info");
  }

  function limparBiblioteca() {
    setBiblioteca([]);
    setDocumentoGerado(null);
    mostrarAviso("Biblioteca esvaziada", "atencao");
  }

  // Quando o PDF fica pronto, o app leva o usuario para a tela do arquivo
  function receberPdf(documento) {
    setDocumentoGerado({ ...documento, codigo: criarCodigoNovo() });
    setTelaAtual("pdf");
    mostrarAviso("PDF gerado: " + documento.arquivo, "certo");
  }

  // Se ninguem entrou ainda, mostra so a tela de login
  if (!usuario) {
    return (
      <div className={config.altoContraste ? "aplicativo contraste" : "aplicativo"}>
        <div className="aparelho">
          <span className="camera-frontal"></span>
          <main className="celular">
            <TelaLogin aoEntrar={entrar} />
          </main>
          <div className="barra-android">
            <span className="android-voltar"></span>
            <span className="android-inicio"></span>
            <span className="android-recentes"></span>
          </div>
        </div>
        <Rodape integrantes={integrantes} turma="1ESPG-2026" />
      </div>
    );
  }

  return (
    <div className={config.altoContraste ? "aplicativo contraste" : "aplicativo"}>
      <BarraSuperior usuario={usuario} aoSair={sair} />

      <div className="aparelho">
        <span className="camera-frontal"></span>

        <main className="celular">
          <Cabecalho
            situacao={situacoes[telaAtual]}
            aoAbrirArquivos={() => trocarTela("pdf")}
          />

          <div className="corpo">
            {telaAtual === "camera" && (
              <TelaCamera
                aoTrocarTela={trocarTela}
                totalSalvos={biblioteca.length}
                mediaDeAcerto={calcularMediaDeConfianca(biblioteca)}
                mostrarAviso={mostrarAviso}
              />
            )}

            {telaAtual === "estudo" && (
              <TelaEstudo
                velocidade={config.velocidade}
                volume={config.volume}
                leituraAutomatica={config.leituraAutomatica}
                aoSalvarNaBiblioteca={salvarNaBiblioteca}
                mostrarAviso={mostrarAviso}
              />
            )}

            {telaAtual === "lousa" && (
              <TelaLousa
                velocidade={config.velocidade}
                volume={config.volume}
                leituraAutomatica={config.leituraAutomatica}
                aoSalvarNaBiblioteca={salvarNaBiblioteca}
                mostrarAviso={mostrarAviso}
              />
            )}

            {telaAtual === "digitalizar" && <TelaDigitalizar aoGerarPdf={receberPdf} />}

            {telaAtual === "pdf" && (
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
            )}

            {telaAtual === "acessibilidade" && (
              <TelaAcessibilidade
                config={config}
                aoMudarConfig={mudarConfig}
                aoLimparBiblioteca={limparBiblioteca}
                totalSalvos={biblioteca.length}
                usuario={usuario}
              />
            )}
          </div>

          <BarraDeModos telaAtual={telaAtual} aoTrocarTela={trocarTela} />

          <Aviso texto={aviso.texto} tipo={aviso.tipo} />
        </main>

        <div className="barra-android">
          <span className="android-voltar"></span>
          <span className="android-inicio"></span>
          <span className="android-recentes"></span>
        </div>
      </div>

      <Rodape integrantes={integrantes} turma="1ESPG-2026" />
    </div>
  );
}

export default App;
