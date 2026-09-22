// Hook customizado: liga e desliga o comando de voz.
//
// Toda a parte chata de ligar o microfone, tratar erro de permissao e
// religar o ouvinte quando o navegador para sozinho fica aqui dentro.
// A tela que usa este hook so precisa dizer: esta ligado? e o que fazer
// quando entender um comando.

import { useEffect, useRef } from "react";
import { criarOuvinte, navegadorSabeOuvir } from "../comandoDeVoz.js";

export function useComandoDeVoz({ ligado, aoEntenderModo, mostrarAviso }) {
  const ouvinteRef = useRef(null);

  // As funcoes mudam a cada redesenho da tela. Guardando elas numa ref, o
  // microfone nao precisa ser religado toda vez - so quando a chave do
  // comando de voz e ligada ou desligada de verdade.
  const funcoesRef = useRef({ aoEntenderModo, mostrarAviso });
  funcoesRef.current = { aoEntenderModo, mostrarAviso };

  useEffect(() => {
    if (!ligado) {
      return;
    }

    if (!navegadorSabeOuvir()) {
      funcoesRef.current.mostrarAviso(
        "Este navegador nao reconhece comandos de voz.",
        "atencao"
      );
      return;
    }

    const ouvinte = criarOuvinte(
      (tela, frase) => {
        funcoesRef.current.aoEntenderModo(tela);
        funcoesRef.current.mostrarAviso('Entendi: "' + frase + '"', "certo");
      },
      (frase) => {
        funcoesRef.current.mostrarAviso('Nao entendi: "' + frase + '"', "atencao");
      }
    );

    // Se o navegador parar de ouvir sozinho, comeca a ouvir de novo.
    ouvinte.onend = () => {
      if (ouvinteRef.current === ouvinte) {
        ouvinte.start();
      }
    };

    ouvinte.onerror = () => {
      funcoesRef.current.mostrarAviso(
        "Nao consegui usar o microfone. Verifique a permissao.",
        "atencao"
      );
    };

    ouvinteRef.current = ouvinte;
    ouvinte.start();

    // Ao desligar a chave (ou sair da tela), para de ouvir.
    return () => {
      ouvinteRef.current = null;
      ouvinte.onend = null;
      ouvinte.stop();
    };
  }, [ligado]);
}
