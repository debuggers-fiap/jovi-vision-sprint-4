// Componente filho: os botoes que trocam de tela.
// Recebe do App qual e a tela atual e a funcao que faz a troca.

import {
  IconeCamera,
  IconeEstudo,
  IconeLousa,
  IconeDocumento,
  IconeAjustes,
} from "./Icones.jsx";

const modos = [
  { id: "camera", nome: "Foto", Icone: IconeCamera },
  { id: "estudo", nome: "Estudo", Icone: IconeEstudo },
  { id: "lousa", nome: "Lousa", Icone: IconeLousa },
  { id: "digitalizar", nome: "Digitalizar", Icone: IconeDocumento },
  { id: "acessibilidade", nome: "Ajustes", Icone: IconeAjustes },
];

function BarraDeModos({ telaAtual, aoTrocarTela }) {
  return (
    <nav className="barra-modos">
      {modos.map((modo) => {
        const Icone = modo.Icone;
        return (
          <button
            key={modo.id}
            className={telaAtual === modo.id ? "modo modo-ativo" : "modo"}
            onClick={() => aoTrocarTela(modo.id)}
          >
            <Icone />
            <span className="modo-nome">{modo.nome}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BarraDeModos;
