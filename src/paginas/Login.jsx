// Pagina publica: a tela de entrada do aplicativo.
//
// Fica no endereco /login. Quem ja esta logado nao precisa ver esta tela,
// entao e mandado direto para o aplicativo.

import { Navigate, useNavigate } from "react-router-dom";
import TelaLogin from "../componentes/TelaLogin.jsx";
import Rodape from "../componentes/Rodape.jsx";

function Login({ entrou, aoEntrar, integrantes, turma, altoContraste }) {
  const navegar = useNavigate();

  if (entrou) {
    return <Navigate to="/app" replace />;
  }

  // Depois de entrar, o usuario vai para a tela da camera.
  function entrarEIr(dadosDoUsuario) {
    aoEntrar(dadosDoUsuario);
    navegar("/app");
  }

  return (
    <div className={altoContraste ? "aplicativo contraste" : "aplicativo"}>
      <div className="aparelho">
        <span className="camera-frontal"></span>
        <main className="celular">
          <TelaLogin aoEntrar={entrarEIr} />
        </main>
        <div className="barra-android">
          <span className="android-voltar"></span>
          <span className="android-inicio"></span>
          <span className="android-recentes"></span>
        </div>
      </div>
      <Rodape integrantes={integrantes} turma={turma} />
    </div>
  );
}

export default Login;
