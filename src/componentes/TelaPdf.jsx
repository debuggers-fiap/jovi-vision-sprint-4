// Tela do PDF gerado, com a biblioteca dos itens salvos logo abaixo.
// Os botoes de exportar, ouvir, traduzir e compartilhar sao os mesmos
// que o prototipo da Sprint 2 tinha nesta tela.
// Recebe do App o documento gerado, a lista da biblioteca e as funcoes
// de salvar e de remover.

import { useState } from "react";
import ItemSalvo from "./ItemSalvo.jsx";
import { calcularMediaDeConfianca } from "../funcoes.js";
import { falar, pararDeFalar, navegadorSabeFalar } from "../voz.js";
import { traduzir } from "../traducao.js";

// Para onde o arquivo pode ser enviado, como na Sprint 2.
const destinos = ["Google Drive", "Notion", "WhatsApp"];

// Idiomas oferecidos na traducao do documento.
const idiomas = ["Ingles (EN)", "Espanhol (ES)", "Frances (FR)", "Alemao (DE)"];

function TelaPdf({
  documento,
  biblioteca,
  aoSalvarPdf,
  aoRemover,
  aoTrocarTela,
  aoRenomear,
  velocidade,
  volume,
  mostrarAviso,
}) {
  const [traduzido, setTraduzido] = useState(false);

  // Procura o documento atual dentro da biblioteca para saber se ja foi salvo
  const jaEstaSalvo = biblioteca.find(
    (item) => documento && item.codigo === documento.codigo
  );

  const media = calcularMediaDeConfianca(biblioteca);
  const textoNaTela = documento && traduzido ? traduzir(documento.texto) : documento?.texto;

  // Pergunta o nome do arquivo, do jeito que a Sprint 2 fazia.
  function renomearArquivo() {
    const escolhido = prompt("Nome do arquivo PDF:", documento.arquivo);
    if (!escolhido || !escolhido.trim()) {
      return;
    }
    let nome = escolhido.trim();
    if (!nome.endsWith(".pdf")) {
      nome = nome + ".pdf";
    }
    aoRenomear(nome);
    mostrarAviso("PDF salvo como " + nome, "certo");
  }

  function exportar() {
    const lista = destinos.map((d, i) => i + 1 + " - " + d).join("\n");
    const escolha = prompt("Exportar para:\n" + lista + "\n\nDigite o numero:");

    if (escolha === null) {
      return;
    }
    const posicao = parseInt(escolha, 10) - 1;
    if (destinos[posicao]) {
      mostrarAviso("Exportado para " + destinos[posicao], "certo");
    } else {
      mostrarAviso("Opcao invalida. Escolha 1, 2 ou 3.", "atencao");
    }
  }

  function ouvir() {
    const resumo =
      "Documento digitalizado: " +
      documento.titulo +
      ". " +
      documento.paginas +
      " pagina. Taxa de reconhecimento: " +
      documento.confianca +
      " por cento.";

    pararDeFalar();
    const comecou = falar(resumo, velocidade, volume, "pt-BR", null);
    mostrarAviso(comecou ? "Lendo o documento..." : "Este navegador nao tem voz.", "info");
  }

  function trocarTraducao() {
    const novo = !traduzido;
    setTraduzido(novo);

    if (!novo) {
      mostrarAviso("Texto original restaurado", "info");
      return;
    }

    const lista = idiomas.map((l, i) => i + 1 + " - " + l).join("\n");
    const escolha = prompt("Traduzir para:\n" + lista + "\n\nDigite o numero:");
    const posicao = parseInt(escolha, 10) - 1;

    if (idiomas[posicao]) {
      mostrarAviso("Traduzido para " + idiomas[posicao], "info");
    } else {
      mostrarAviso("Idioma nao reconhecido. Mostrando em ingles.", "atencao");
    }
  }

  function compartilhar() {
    const conteudo = {
      title: "JOVI Vision - " + documento.arquivo,
      text: "Documento digitalizado pelo JOVI Vision: " + documento.arquivo,
    };

    // navigator.share so existe em alguns navegadores, principalmente no celular.
    if (navigator.share) {
      navigator
        .share(conteudo)
        .then(() => mostrarAviso("Documento compartilhado!", "certo"))
        .catch(() => mostrarAviso("Compartilhamento cancelado", "atencao"));
    } else {
      mostrarAviso("Este navegador nao abre o menu de compartilhar.", "atencao");
    }
  }

  return (
    <div className="tela tela-conteudo">
      {documento ? (
        <div className="pdf">
          <div className="pdf-icone">PDF</div>
          <h2 className="pdf-titulo">{documento.titulo}</h2>
          <p className="pdf-codigo">
            {documento.arquivo} - {documento.codigo}
          </p>

          <div className="pdf-dados">
            <span>{documento.paginas} pagina</span>
            <span>{documento.tamanho} KB</span>
            <span>{documento.confianca}% de acerto</span>
          </div>

          <p className="pdf-previa">{textoNaTela}</p>

          <button
            className="botao"
            onClick={() => aoSalvarPdf(documento)}
            disabled={jaEstaSalvo ? true : false}
          >
            {jaEstaSalvo ? "Salvo na biblioteca" : "Salvar na biblioteca"}
          </button>

          <div className="acoes-pdf">
            <button className="acao" onClick={renomearArquivo}>
              Salvar como
            </button>
            <button className="acao" onClick={exportar}>
              Exportar
            </button>
            <button
              className="acao"
              onClick={ouvir}
              disabled={!navegadorSabeFalar()}
            >
              Ouvir
            </button>
            <button
              className={traduzido ? "acao acao-ativa" : "acao"}
              onClick={trocarTraducao}
            >
              {traduzido ? "Original" : "Traduzir"}
            </button>
            <button className="acao" onClick={compartilhar}>
              Compartilhar
            </button>
          </div>
        </div>
      ) : (
        <div className="vazio">
          <p>Nenhum PDF foi gerado ainda.</p>
          <button className="botao" onClick={() => aoTrocarTela("digitalizar")}>
            Digitalizar um documento
          </button>
        </div>
      )}

      <section className="biblioteca">
        <div className="biblioteca-topo">
          <h2 className="secao-titulo">Biblioteca</h2>
          <span className="etiqueta">
            {biblioteca.length} itens - media {media}%
          </span>
        </div>

        {biblioteca.length === 0 ? (
          <p className="aviso">
            Ainda nao ha nada salvo. O que voce salvar continua aqui mesmo
            depois de recarregar a pagina.
          </p>
        ) : (
          <ul className="lista">
            {biblioteca.map((item) => (
              <ItemSalvo key={item.codigo} item={item} aoRemover={aoRemover} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default TelaPdf;
