// Componente principal do projeto.
//
// Ele faz duas coisas, e so essas duas:
//
// 1. Guarda quem esta logado e as preferencias do usuario, usando os hooks
//    customizados que ficam na pasta src/hooks.
// 2. Decide qual pagina aparece em cada endereco do navegador.
//
// As rotas do projeto:
//
//   PUBLICAS   /        Landing Page explicando a solucao
//              /login   Tela de entrada do aplicativo
//
//   PRIVADAS   /app/*   O aplicativo da camera (so para quem entrou)
//
// Quem esta de fora e tenta abrir /app e mandado para /login. Quem cuida
// dessa regra e o componente RotaPrivada.

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./paginas/Landing.jsx";
import Login from "./paginas/Login.jsx";
import Aplicativo from "./paginas/Aplicativo.jsx";
import RotaPrivada from "./componentes/RotaPrivada.jsx";

import { useAutenticacao } from "./hooks/useAutenticacao.js";
import { useConfiguracoes } from "./hooks/useConfiguracoes.js";
import { useAviso } from "./hooks/useAviso.js";

// Dados fixos da equipe, passados por props para o rodape das paginas.
const integrantes = [
  { nome: "Enrico Vieira de Almeida Vidal", rm: "RM569217" },
  { nome: "Vinicius Fuentes Cavalcanti", rm: "RM570818" },
  { nome: "Thiago Fernandes Kulesza", rm: "RM568922" },
  { nome: "Guilherme De Rosa Peres", rm: "RM569193" },
];

const turma = "1ESPG-2026";

function App() {
  const { usuario, entrou, entrar, sair } = useAutenticacao();
  const { config, mudarConfig } = useConfiguracoes();
  const { aviso, mostrarAviso } = useAviso();

  return (
    <Routes>
      <Route path="/" element={<Landing integrantes={integrantes} turma={turma} />} />

      <Route
        path="/login"
        element={
          <Login
            entrou={entrou}
            aoEntrar={entrar}
            integrantes={integrantes}
            turma={turma}
            altoContraste={config.altoContraste}
          />
        }
      />

      <Route
        path="/app/*"
        element={
          <RotaPrivada entrou={entrou}>
            <Aplicativo
              usuario={usuario}
              aoSair={sair}
              config={config}
              aoMudarConfig={mudarConfig}
              aviso={aviso}
              mostrarAviso={mostrarAviso}
              integrantes={integrantes}
              turma={turma}
            />
          </RotaPrivada>
        }
      />

      {/* Qualquer outro endereco volta para a Landing Page. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
