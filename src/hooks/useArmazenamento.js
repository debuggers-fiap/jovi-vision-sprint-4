// Hook customizado: um estado que se lembra sozinho.
//
// Funciona igual ao useState normal, com uma diferenca: sempre que o valor
// muda, ele e gravado no localStorage do navegador. E quando a pagina abre
// de novo, o valor volta do jeito que estava.
//
// E a base dos outros hooks deste projeto, para nao repetir em cada um
// a mesma dupla de useState + useEffect.

import { useState, useEffect } from "react";
import { salvarNoNavegador, lerDoNavegador } from "../armazenamento.js";

export function useArmazenamento(chave, valorPadrao) {
  // A funcao dentro do useState so roda na primeira vez que o componente
  // aparece na tela. Assim o navegador nao e lido a cada redesenho.
  const [valor, setValor] = useState(() => lerDoNavegador(chave, valorPadrao));

  useEffect(() => {
    salvarNoNavegador(chave, valor);
  }, [chave, valor]);

  return [valor, setValor];
}
