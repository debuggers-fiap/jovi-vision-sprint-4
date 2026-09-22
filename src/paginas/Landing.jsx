// Pagina publica: a Landing Page do JOVI Vision.
//
// Esta e a primeira tela de quem abre o site. Ela explica a solucao da
// Challenge e leva para o aplicativo.
//
// Na Sprint 3 esta pagina era um index.html separado, com CSS proprio.
// Agora ela e feita de componentes React e estilizada com Tailwind, dentro
// do mesmo projeto do aplicativo - que e o que a Sprint 4 pede.
//
// A pagina monta as secoes na ordem e entrega para cada uma o conteudo que
// ela precisa, por props. Todas as secoes usam Grid.

import CabecalhoLanding from "../componentes/landing/CabecalhoLanding.jsx";
import Abertura from "../componentes/landing/Abertura.jsx";
import Numeros from "../componentes/landing/Numeros.jsx";
import Solucao from "../componentes/landing/Solucao.jsx";
import PublicoAlvo from "../componentes/landing/PublicoAlvo.jsx";
import Galeria from "../componentes/landing/Galeria.jsx";
import Equipe from "../componentes/landing/Equipe.jsx";
import Contato from "../componentes/landing/Contato.jsx";
import RodapeLanding from "../componentes/landing/RodapeLanding.jsx";

import {
  numerosDoProjeto,
  modosDaSolucao,
  telasDaGaleria,
  equipeDoProjeto,
  secoesDoMenu,
} from "../dados/conteudoDaLanding.js";

function Landing({ turma }) {
  return (
    <div className="min-h-screen bg-fundo font-sans text-texto">
      <CabecalhoLanding secoes={secoesDoMenu} />

      <main>
        <Abertura />
        <Numeros numeros={numerosDoProjeto} />
        <Solucao modos={modosDaSolucao} />
        <PublicoAlvo />
        <Galeria telas={telasDaGaleria} />
        <Equipe integrantes={equipeDoProjeto} turma={turma} />
        <Contato />
      </main>

      <RodapeLanding turma={turma} />
    </div>
  );
}

export default Landing;
