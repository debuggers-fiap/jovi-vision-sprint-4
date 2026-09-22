// Scanner de Lousa: simula o reconhecimento do que esta escrito na lousa.
// Recebe do App a velocidade da leitura e a funcao de salvar.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import CartaoResultado from "./CartaoResultado.jsx";
import { textosDeLousa } from "../dados/textosSimulados.js";
import { sortearItem, sortearConfianca, nomeDaLousa } from "../funcoes.js";

function TelaLousa({
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

    setTimeout(() => {
      const sorteado = sortearItem(textosDeLousa);
      setResultado({
        titulo: sorteado.titulo,
        texto: sorteado.texto,
        confianca: sortearConfianca(),
      });
      setOcupado(false);
    }, 1800);
  }

  function salvar() {
    aoSalvarNaBiblioteca(resultado);
    setFoiSalvo(true);
    mostrarAviso("Salvo como " + nomeDaLousa(), "certo");
  }

  return (
    <div className="tela">
      <Visor
        tipo="lousa"
        ocupado={ocupado}
        compacto={resultado !== null}
        etiqueta={ocupado ? "LENDO A DISTANCIA" : "LOUSA ENQUADRADA"}
      >
        {!resultado && (
          <BotaoObturador
            aoCapturar={capturar}
            ocupado={ocupado}
            rotulo="Capturar a lousa"
          />
        )}
      </Visor>

      {resultado ? (
        <CartaoResultado
          resultado={resultado}
          velocidade={velocidade}
          volume={volume}
          leituraAutomatica={leituraAutomatica}
          aoSalvar={salvar}
          foiSalvo={foiSalvo}
          aoFechar={() => setResultado(null)}
        />
      ) : (
        <p className="aviso">
          O modo lousa aumenta o contraste da imagem para conseguir ler letra de
          mao a alguns metros de distancia.
        </p>
      )}
    </div>
  );
}

export default TelaLousa;
