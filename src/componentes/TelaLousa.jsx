// Scanner de Lousa: simula o reconhecimento do que esta escrito na lousa.
//
// Recebe por props os textos do acervo (que vem da API), a velocidade da
// leitura e a funcao de salvar.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import CartaoResultado from "./CartaoResultado.jsx";
import { sortearItem, sortearConfianca } from "../funcoes.js";

function TelaLousa({
  textos,
  velocidade,
  volume,
  leituraAutomatica,
  aoSalvarNaBiblioteca,
}) {
  const [resultado, setResultado] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [foiSalvo, setFoiSalvo] = useState(false);

  function capturar() {
    setOcupado(true);
    setResultado(null);
    setFoiSalvo(false);

    setTimeout(() => {
      const sorteado = sortearItem(textos);
      setResultado({
        titulo: sorteado.titulo,
        texto: sorteado.texto,
        confianca: sortearConfianca(),
      });
      setOcupado(false);
    }, 1800);
  }

  // Quem mostra o aviso de confirmacao e o hook useBiblioteca, porque e ele
  // que sabe se o item foi registrado no servidor ou so aqui no aparelho.
  function salvar() {
    aoSalvarNaBiblioteca(resultado);
    setFoiSalvo(true);
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
