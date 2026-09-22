// Componente filho: a faixa de cima do aplicativo, dentro do celular.
// Comeca com a barra de status do aparelho (hora, sinal e bateria),
// como no prototipo da Sprint 2, e depois mostra a marca e a situacao.
// Recebe do App o texto de situacao e a funcao que abre os arquivos.

import { useState, useEffect } from "react";
import { IconeMarca, IconeRaio, IconeBiblioteca } from "./Icones.jsx";
import { horaDeAgora } from "../funcoes.js";

function Cabecalho({ situacao, aoAbrirArquivos }) {
  const [hora, setHora] = useState(horaDeAgora());

  // O relogio se atualiza sozinho a cada 30 segundos.
  useEffect(() => {
    const relogio = setInterval(() => {
      setHora(horaDeAgora());
    }, 30000);

    // Quando o componente sai da tela, o relogio para.
    return () => clearInterval(relogio);
  }, []);

  return (
    <header className="cabecalho">
      <div className="barra-status">
        <span className="barra-status-hora">{hora}</span>
        <span className="barra-status-icones" aria-hidden="true">
          <span className="sinal">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="bateria"></span>
        </span>
      </div>

      <div className="cabecalho-linha">
        <div className="marca">
          <span className="marca-selo">
            <IconeMarca />
          </span>
          <p className="marca-nome">
            JOVI <strong>VISION</strong>
          </p>
        </div>

        <button
          className="botao-icone"
          onClick={aoAbrirArquivos}
          title="Abrir os arquivos salvos"
          aria-label="Abrir os arquivos salvos"
        >
          <IconeBiblioteca />
        </button>
      </div>

      <p className="situacao">
        <IconeRaio />
        {situacao}
      </p>
    </header>
  );
}

export default Cabecalho;
