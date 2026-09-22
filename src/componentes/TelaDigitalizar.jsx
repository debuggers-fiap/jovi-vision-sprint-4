// Digitalizar Documento: simula a deteccao das bordas da folha
// e a geracao de um arquivo PDF.
//
// Recebe por props os documentos do acervo (que vem da API) e a funcao que
// registra o PDF gerado.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import { sortearItem, sortearConfianca, estimarTamanhoDoPdf } from "../funcoes.js";

function TelaDigitalizar({ documentos, aoGerarPdf }) {
  const [ocupado, setOcupado] = useState(false);

  function digitalizar() {
    setOcupado(true);

    setTimeout(() => {
      const sorteado = sortearItem(documentos);

      // Monta o documento com os calculos do arquivo.
      // O codigo de identificacao e criado pelo App.
      const documento = {
        titulo: sorteado.titulo,
        arquivo: sorteado.arquivo,
        texto: sorteado.texto,
        confianca: sortearConfianca(),
        tamanho: estimarTamanhoDoPdf(sorteado.texto),
        paginas: 1,
      };

      setOcupado(false);
      aoGerarPdf(documento);
    }, 2000);
  }

  return (
    <div className="tela">
      <Visor
        tipo="documento"
        ocupado={ocupado}
        etiqueta={ocupado ? "GERANDO O PDF" : "BORDAS DETECTADAS"}
      >
        <BotaoObturador
          aoCapturar={digitalizar}
          ocupado={ocupado}
          rotulo="Digitalizar documento"
        />
      </Visor>

      <p className="aviso">
        A JOVI recorta a folha automaticamente, corrige a inclinacao e monta o
        arquivo PDF.
      </p>
    </div>
  );
}

export default TelaDigitalizar;
