// Componente neto: a gaveta que sobe mostrando o texto reconhecido.
// Usada tanto no Modo Estudo quanto no Scanner de Lousa.
// E aqui que o texto e lido em voz alta, traduzido e copiado.

import { useState, useEffect } from "react";
import { estimarTempoDeLeitura } from "../funcoes.js";
import { falar, pararDeFalar, navegadorSabeFalar } from "../voz.js";
import { traduzir } from "../traducao.js";

function CartaoResultado({
  resultado,
  velocidade,
  volume,
  leituraAutomatica,
  aoSalvar,
  foiSalvo,
  aoFechar,
}) {
  const [lendo, setLendo] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [traduzido, setTraduzido] = useState(false);

  // O texto que aparece na tela: o original ou a traducao.
  const textoNaTela = traduzido ? traduzir(resultado.texto) : resultado.texto;
  const idioma = traduzido ? "en-US" : "pt-BR";

  const palavras = textoNaTela.split(" ").length;
  const minutos = estimarTempoDeLeitura(textoNaTela);

  // Assim que a gaveta aparece, o texto ja comeca a ser lido em voz alta,
  // desde que a leitura automatica esteja ligada em Acessibilidade.
  // O estudante com deficiencia visual nao precisa procurar botao nenhum.
  useEffect(function () {
    if (leituraAutomatica) {
      const comecou = falar(resultado.texto, velocidade, volume, "pt-BR", function () {
        setLendo(false);
      });
      setLendo(comecou);
    }

    // Quando a gaveta some da tela, a leitura para junto.
    return function () {
      pararDeFalar();
    };
  }, [resultado, velocidade, volume, leituraAutomatica]);

  function ouvirOuParar() {
    if (lendo) {
      pararDeFalar();
      setLendo(false);
      return;
    }
    const comecou = falar(textoNaTela, velocidade, volume, idioma, function () {
      setLendo(false);
    });
    setLendo(comecou);
  }

  function trocarTraducao() {
    pararDeFalar();
    setLendo(false);
    setCopiado(false);
    setTraduzido(!traduzido);
  }

  function copiarTexto() {
    navigator.clipboard.writeText(textoNaTela);
    setCopiado(true);
  }

  return (
    <div className="gaveta">
      <span className="gaveta-puxador"></span>

      <div className="gaveta-topo">
        <div>
          <h2 className="gaveta-titulo">
            {traduzido ? "Texto traduzido" : "Texto reconhecido"}
          </h2>
          <p className="gaveta-fonte">{resultado.titulo}</p>
        </div>
        <button className="botao-fechar" onClick={aoFechar} title="Fechar">
          ×
        </button>
      </div>

      <div className="medida">
        <span className="medida-numero">{palavras} palavras</span>
        <span className="medida-barra">
          <span
            className="medida-cheia"
            style={{ width: resultado.confianca + "%" }}
          ></span>
        </span>
        <span className="medida-valor">{resultado.confianca}%</span>
      </div>

      {lendo && (
        <div className="voz">
          <span className="onda"></span>
          <span className="onda"></span>
          <span className="onda"></span>
          <span className="onda"></span>
          <span className="onda"></span>
        </div>
      )}

      <p className="gaveta-texto">{textoNaTela}</p>

      <p className="gaveta-dados">
        leitura de {minutos} min na velocidade {velocidade}x
        {!navegadorSabeFalar() && " - este navegador nao tem voz"}
      </p>

      <div className="acoes">
        <button
          className={lendo ? "acao acao-ativa" : "acao"}
          onClick={ouvirOuParar}
          disabled={!navegadorSabeFalar()}
        >
          {lendo ? "Parar" : "Ouvir"}
        </button>

        <button
          className={traduzido ? "acao acao-ativa" : "acao"}
          onClick={trocarTraducao}
        >
          {traduzido ? "Original" : "Traduzir"}
        </button>

        <button className="acao" onClick={copiarTexto}>
          {copiado ? "Copiado" : "Copiar"}
        </button>

        <button className="acao" onClick={aoSalvar} disabled={foiSalvo}>
          {foiSalvo ? "Salvo" : "Salvar"}
        </button>
      </div>
    </div>
  );
}

export default CartaoResultado;
