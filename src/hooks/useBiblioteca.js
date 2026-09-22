// Hook customizado: a biblioteca de textos e documentos salvos.
//
// A lista fica guardada no proprio aparelho, no localStorage. Ja a
// identificacao de cada item novo (o codigo DOC-0000, a data e o tamanho)
// vem da nossa API - e o servidor que decide, nao o navegador.
//
// Se a API nao responder, o item e salvo do mesmo jeito, com o codigo gerado
// aqui, e o usuario recebe um aviso dizendo que foi assim. O que nao pode
// acontecer e o usuario apertar salvar e nada acontecer.

import { useState } from "react";
import { useArmazenamento } from "./useArmazenamento.js";
import { registrarItem } from "../servicoDaApi.js";
import { gerarCodigo, dataDeAgora, estimarTamanhoDoPdf } from "../funcoes.js";

export function useBiblioteca(mostrarAviso) {
  const [biblioteca, setBiblioteca] = useArmazenamento("jovi_biblioteca", []);
  const [salvando, setSalvando] = useState(false);

  // Sorteia um codigo que ainda nao esteja sendo usado na biblioteca, para
  // que dois itens diferentes nunca fiquem com o mesmo codigo.
  function criarCodigoNovo() {
    let codigo = gerarCodigo();
    while (biblioteca.find((item) => item.codigo === codigo)) {
      codigo = gerarCodigo();
    }
    return codigo;
  }

  // Guarda um texto reconhecido no Modo Estudo ou no Scanner de Lousa.
  async function salvarNaBiblioteca(resultado) {
    setSalvando(true);

    try {
      // Primeiro tenta pedir a identificacao para o servidor.
      const item = await registrarItem({
        titulo: resultado.titulo,
        texto: resultado.texto,
        confianca: resultado.confianca,
      });

      setBiblioteca((anterior) => [item, ...anterior]);
      mostrarAviso("Salvo na biblioteca como " + item.codigo, "certo");
    } catch (problema) {
      // O servidor nao respondeu. O item e salvo aqui mesmo, e o usuario
      // fica sabendo que foi assim.
      const itemLocal = {
        codigo: criarCodigoNovo(),
        titulo: resultado.titulo,
        texto: resultado.texto,
        confianca: resultado.confianca,
        tamanho: estimarTamanhoDoPdf(resultado.texto),
        data: dataDeAgora(),
      };

      setBiblioteca((anterior) => [itemLocal, ...anterior]);
      mostrarAviso("Salvo apenas neste aparelho: o servidor nao respondeu.", "atencao");
    } finally {
      setSalvando(false);
    }
  }

  // Guarda na biblioteca o PDF que acabou de ser gerado. O codigo dele ja
  // foi criado no momento em que o documento ficou pronto.
  function salvarPdf(documento) {
    const novoItem = { ...documento, data: dataDeAgora() };
    setBiblioteca((anterior) => [novoItem, ...anterior]);
    mostrarAviso("PDF guardado na biblioteca", "certo");
  }

  function removerDaBiblioteca(codigo) {
    setBiblioteca((anterior) => anterior.filter((item) => item.codigo !== codigo));
    mostrarAviso("Item removido da biblioteca", "info");
  }

  function limparBiblioteca() {
    setBiblioteca([]);
    mostrarAviso("Biblioteca esvaziada", "atencao");
  }

  return {
    biblioteca,
    salvando,
    criarCodigoNovo,
    salvarNaBiblioteca,
    salvarPdf,
    removerDaBiblioteca,
    limparBiblioteca,
  };
}
