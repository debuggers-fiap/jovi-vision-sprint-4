// Hook customizado: busca na API o acervo de conteudos do aplicativo.
//
// Devolve tres coisas para a tela: os conteudos, se ainda esta carregando e
// qual foi o erro, se houve algum.
//
// Se a API nao responder, o aplicativo NAO trava e NAO fica em silencio:
// ele avisa na tela e continua funcionando com uma copia local dos textos,
// que fica em src/dados/textosSimulados.js.

import { useState, useEffect } from "react";
import { buscarConteudos } from "../servicoDaApi.js";
import {
  textosDeLivro,
  textosDeLousa,
  documentosSimulados,
} from "../dados/textosSimulados.js";

// A copia que vale enquanto a resposta da API nao chega, e tambem quando
// ela nao chega nunca.
const acervoLocal = {
  livro: textosDeLivro,
  lousa: textosDeLousa,
  documentos: documentosSimulados,
};

export function useConteudos() {
  const [conteudos, setConteudos] = useState(acervoLocal);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Este controle serve para nao tentar mudar a tela depois que ela ja saiu.
    let telaAindaAberta = true;

    async function carregar() {
      try {
        const dados = await buscarConteudos();

        if (telaAindaAberta) {
          setConteudos({
            livro: dados.livro,
            lousa: dados.lousa,
            documentos: dados.documentos,
          });
          setErro("");
        }
      } catch (problema) {
        if (telaAindaAberta) {
          setErro(
            "Nao consegui falar com o servidor. Usando o acervo salvo no aplicativo. (" +
              problema.message +
              ")"
          );
        }
      } finally {
        if (telaAindaAberta) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      telaAindaAberta = false;
    };
  }, []);

  return { conteudos, carregando, erro };
}
