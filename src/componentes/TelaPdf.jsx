// Tela do PDF gerado, com a biblioteca dos itens salvos logo abaixo.
// Os botoes de exportar, ouvir, traduzir e compartilhar sao os mesmos
// que o prototipo da Sprint 2 tinha nesta tela.
// Recebe do App o documento gerado, a lista da biblioteca e as funcoes
// de salvar e de remover.

import { useState } from "react";
import ItemSalvo from "./ItemSalvo.jsx";
import EstatisticasDaBiblioteca from "./EstatisticasDaBiblioteca.jsx";
import { falar, pararDeFalar, navegadorSabeFalar } from "../voz.js";
import { traduzir } from "../traducao.js";
import {
  useBuscaNaBiblioteca,
  montarArquivoDaBiblioteca,
} from "../hooks/useBuscaNaBiblioteca.js";

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

  // A busca e os numeros de uso vem do hook, prontos para desenhar.
  const { termo, setTermo, resultados, estatisticas, procurando } =
    useBuscaNaBiblioteca(biblioteca);

  // Procura o documento atual dentro da biblioteca para saber se ja foi salvo
  const jaEstaSalvo = biblioteca.find(
    (item) => documento && item.codigo === documento.codigo
  );

  const textoNaTela = documento && traduzido ? traduzir(documento.texto) : documento?.texto;

  // Baixa a biblioteca inteira como um arquivo de texto, para o estudante
  // levar o conteudo para fora do aplicativo.
  function baixarBiblioteca() {
    if (biblioteca.length === 0) {
      mostrarAviso("Nao ha nada salvo para exportar.", "atencao");
      return;
    }

    const conteudo = montarArquivoDaBiblioteca(biblioteca);
    const arquivo = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
    const endereco = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = endereco;
    link.download = "JOVI_Vision_Biblioteca.txt";
    link.click();

    // Libera a memoria que o navegador reservou para o arquivo.
    URL.revokeObjectURL(endereco);

    mostrarAviso("Biblioteca exportada em JOVI_Vision_Biblioteca.txt", "certo");
  }

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
          <button
            type="button"
            className="cursor-pointer rounded-full border border-azul px-3 py-1 font-mono text-[10px] tracking-wider text-azul uppercase"
            onClick={baixarBiblioteca}
          >
            Exportar
          </button>
        </div>

        <EstatisticasDaBiblioteca estatisticas={estatisticas} />

        {biblioteca.length > 0 && (
          <div className="mt-3">
            <label htmlFor="busca" className="sr-only">
              Procurar na biblioteca
            </label>
            <input
              type="search"
              id="busca"
              value={termo}
              onChange={(evento) => setTermo(evento.target.value)}
              placeholder="Procurar por titulo, texto ou codigo"
              className="w-full rounded-lg border border-borda bg-fundo px-3 py-2 text-[13px] text-texto placeholder:text-texto-fraco focus:border-azul focus:outline-none"
            />
            {procurando && (
              <p className="mt-1.5 font-mono text-[10px] text-texto-fraco">
                {resultados.length} de {biblioteca.length}{" "}
                {resultados.length === 1 ? "item encontrado" : "itens encontrados"}
              </p>
            )}
          </div>
        )}

        {biblioteca.length === 0 ? (
          <p className="aviso">
            Ainda nao ha nada salvo. O que voce salvar continua aqui mesmo
            depois de recarregar a pagina.
          </p>
        ) : resultados.length === 0 ? (
          <p className="aviso">
            Nenhum item combina com "{termo}". Tente outra palavra.
          </p>
        ) : (
          <ul className="lista">
            {resultados.map((item) => (
              <ItemSalvo key={item.codigo} item={item} aoRemover={aoRemover} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default TelaPdf;
