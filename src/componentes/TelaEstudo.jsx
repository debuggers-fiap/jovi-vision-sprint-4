// Modo Estudo: simula o reconhecimento do texto de um livro
// e a leitura em voz alta.
//
// Recebe por props os textos do acervo (que vem da API), a velocidade da
// leitura e a funcao de salvar. Esta tela nao busca nada sozinha: ela so
// desenha e avisa o que o usuario fez.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import CartaoResultado from "./CartaoResultado.jsx";
import { sortearItem, sortearConfianca } from "../funcoes.js";

function TelaEstudo({
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

    // Espera um pouco para simular o tempo que a analise levaria
    setTimeout(() => {
      const sorteado = sortearItem(textos);
      setResultado({
        titulo: sorteado.titulo,
        texto: sorteado.texto,
        confianca: sortearConfianca(),
      });
      setOcupado(false);
    }, 1500);
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
