// Hook customizado: a busca e os numeros da biblioteca.
//
// Recebe a lista de itens salvos e devolve tres coisas para a tela:
// o texto digitado na busca, os itens que combinam com ele e as
// estatisticas de uso.
//
// A tela nao filtra nada e nao calcula nada: ela so desenha o que este
// hook entrega.

import { useState } from "react";

// Tira acentos e deixa tudo em minusculo, para que procurar por "biologia"
// tambem encontre "Biologia" e "Fisiologia".
function simplificar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function useBuscaNaBiblioteca(biblioteca) {
  const [termo, setTermo] = useState("");

  const procurado = simplificar(termo.trim());

  // Sem nada digitado, mostra a biblioteca inteira.
  const resultados =
    procurado === ""
      ? biblioteca
      : biblioteca.filter((item) => {
          const onde = simplificar(item.titulo + " " + item.texto + " " + item.codigo);
          return onde.includes(procurado);
        });

  // Os numeros de uso, todos com o objeto Math.
  const estatisticas = calcularEstatisticas(biblioteca);

  return {
    termo,
    setTermo,
    resultados,
    estatisticas,
    procurando: procurado !== "",
  };
}

function calcularEstatisticas(lista) {
  if (lista.length === 0) {
    return {
      total: 0,
      mediaDeAcerto: 0,
      melhorAcerto: 0,
      espacoEmKb: 0,
      totalDePalavras: 0,
      maisRecente: null,
    };
  }

  let somaDaConfianca = 0;
  let melhor = 0;
  let somaDoTamanho = 0;
  let palavras = 0;

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    somaDaConfianca = somaDaConfianca + item.confianca;
    melhor = Math.max(melhor, item.confianca);
    somaDoTamanho = somaDoTamanho + item.tamanho;
    palavras = palavras + item.texto.split(" ").length;
  }

  return {
    total: lista.length,
    mediaDeAcerto: Math.round(somaDaConfianca / lista.length),
    melhorAcerto: Math.round(melhor * 10) / 10,
    espacoEmKb: Math.round(somaDoTamanho),
    totalDePalavras: palavras,
    // A biblioteca guarda o mais novo na frente.
    maisRecente: lista[0],
  };
}

// Monta o texto do arquivo que o usuario baixa ao exportar a biblioteca.
export function montarArquivoDaBiblioteca(lista) {
  const linhas = [];

  linhas.push("JOVI VISION - BIBLIOTECA EXPORTADA");
  linhas.push("Gerado em " + new Date().toLocaleString("pt-BR"));
  linhas.push("Total de itens: " + lista.length);
  linhas.push("");
  linhas.push("=".repeat(60));

  for (let i = 0; i < lista.length; i++) {
    const item = lista[i];
    linhas.push("");
    linhas.push(i + 1 + ". " + item.titulo);
    linhas.push("Codigo: " + item.codigo);
    linhas.push("Salvo em: " + item.data);
    linhas.push("Reconhecimento: " + item.confianca + "%");
    linhas.push("Tamanho estimado: " + item.tamanho + " KB");
    linhas.push("");
    linhas.push(item.texto);
    linhas.push("");
    linhas.push("-".repeat(60));
  }

  return linhas.join("\n");
}
