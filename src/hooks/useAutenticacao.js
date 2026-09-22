// Hook customizado: cuida de quem esta logado.
//
// Guarda o usuario, faz entrar e faz sair. Quem usa este hook nao precisa
// saber que isso e gravado no navegador - so chama entrar() e sair().

import { useState } from "react";
import {
  salvarNoNavegador,
  lerDoNavegador,
  apagarDoNavegador,
} from "../armazenamento.js";
import { pararDeFalar } from "../voz.js";

export function useAutenticacao() {
  const [usuario, setUsuario] = useState(() => lerDoNavegador("jovi_usuario", null));

  function entrar(dadosDoUsuario) {
    setUsuario(dadosDoUsuario);
    salvarNoNavegador("jovi_usuario", dadosDoUsuario);
  }

  function sair() {
    // Se o app estiver lendo um texto em voz alta na hora que o usuario sai,
    // a leitura para junto.
    pararDeFalar();
    setUsuario(null);
    apagarDoNavegador("jovi_usuario");
  }

  // entrou vira true ou false. E o que a RotaPrivada usa para decidir
  // se deixa passar ou manda para a tela de login.
  return { usuario, entrou: usuario !== null, entrar, sair };
}
