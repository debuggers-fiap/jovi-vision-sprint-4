// Componente que protege as rotas privadas.
//
// Ele nao desenha nada por conta propria: olha se tem alguem logado e
// decide. Se tiver, mostra o que veio dentro dele. Se nao tiver, manda o
// visitante para a tela de login.
//
// E por causa dele que digitar /app na barra de endereco sem estar logado
// nao abre o aplicativo.

import { Navigate } from "react-router-dom";

function RotaPrivada({ entrou, children }) {
  if (!entrou) {
    // replace faz a tela de login substituir o endereco no historico, para
    // o botao de voltar do navegador nao cair de novo na rota protegida.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaPrivada;
