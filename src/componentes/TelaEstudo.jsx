// Modo Estudo: simula o reconhecimento do texto de um livro
// e a leitura em voz alta.
// Recebe do App a velocidade da leitura e a funcao de salvar.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import CartaoResultado from "./CartaoResultado.jsx";
import { textosDeLivro } from "../dados/textosSimulados.js";
import { sortearItem, sortearConfianca } from "../funcoes.js";

function TelaEstudo({
  velocidade,
  volume,
  leituraAutomatica,
  aoSalvarNaBiblioteca,
  mostrarAviso,
}) {
  const [resultado, setResultado] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [foiSalvo, setFoiSalvo] = useState(false);

  function capturar() {
    setOcupado(true);
    setResultado(null);
    setFoiSalvo(false);

    // Espera um pouco para simular o tempo que a analise levaria
    setTimeout(() => {
      const sorteado = sortearItem(textosDeLivro);
      setResultado({
        titulo: sorteado.titulo,
        texto: sorteado.texto,
        confianca: sortearConfianca(),
      });
      setOcupado(false);
    }, 1500);
  }

  function salvar() {
    aoSalvarNaBiblioteca(resultado);
    setFoiSalvo(true);
    mostrarAviso("Texto guardado na biblioteca", "certo");
  }

  return (
    <div className="tela">
      <Visor
        tipo="livro"
        ocupado={ocupado}
        compacto={resultado !== null}
        etiqueta={ocupado ? "RECONHECENDO" : "TEXTO DETECTADO"}
      >
        {!resultado && (
          <BotaoObturador
            aoCapturar={capturar}
            ocupado={ocupado}
            rotulo="Ler a pagina em voz alta"
          />
        )}
      </Visor>

      {resultado && (
        <CartaoResultado
          resultado={resultado}
          velocidade={velocidade}
          volume={volume}
          leituraAutomatica={leituraAutomatica}
          aoSalvar={salvar}
          foiSalvo={foiSalvo}
          aoFechar={() => setResultado(null)}
        />
      )}
    </div>
  );
}

export default TelaEstudo;
