// Tela inicial: a camera parada, esperando o estudante escolher um modo.
// Traz os mesmos controles que o prototipo da Sprint 2 tinha: flash,
// zoom, virar a camera e o botao de tirar foto.
// Recebe do App a funcao de trocar de tela, os numeros da biblioteca
// e a funcao que mostra o aviso na parte de baixo.

import { useState } from "react";
import Visor from "./Visor.jsx";
import BotaoObturador from "./BotaoObturador.jsx";
import { nomeDaFoto } from "../funcoes.js";

// As cores que a miniatura da ultima foto vai assumindo, uma por foto.
const coresDaMiniatura = ["#e91e8c", "#00c2cb", "#7c3aed", "#f59e0b", "#16a34a"];

const zoomsDisponiveis = ["0.5", "1", "2"];

function TelaCamera({ aoTrocarTela, totalSalvos, mediaDeAcerto, mostrarAviso }) {
  const [flashLigado, setFlashLigado] = useState(false);
  const [cameraFrontal, setCameraFrontal] = useState(false);
  const [zoom, setZoom] = useState("1");
  const [fotosTiradas, setFotosTiradas] = useState(0);
  const [clarao, setClarao] = useState(false);

  function trocarFlash() {
    const novo = !flashLigado;
    setFlashLigado(novo);
    mostrarAviso(novo ? "Flash ativado" : "Flash desativado", "atencao");
  }

  function virarCamera() {
    const nova = !cameraFrontal;
    setCameraFrontal(nova);
    mostrarAviso(nova ? "Camera frontal" : "Camera traseira", "info");
  }

  function trocarZoom(novo) {
    setZoom(novo);
    mostrarAviso("Zoom " + novo + "x", "info");
  }

  function tirarFoto() {
    const numero = fotosTiradas + 1;
    setFotosTiradas(numero);

    // O clarao branco da tela, igual ao do prototipo da Sprint 2.
    setClarao(true);
    setTimeout(() => setClarao(false), 180);

    mostrarAviso("Foto " + numero + " salva: " + nomeDaFoto(numero), "certo");
  }

  // A miniatura muda de cor a cada foto, so para mostrar que algo foi salvo.
  const corDaMiniatura = coresDaMiniatura[fotosTiradas % coresDaMiniatura.length];

  return (
    <div className="tela">
      <div className="controles-camera">
        <button
          className={flashLigado ? "controle controle-ligado" : "controle"}
          onClick={trocarFlash}
          title="Flash"
          aria-label={flashLigado ? "Desligar o flash" : "Ligar o flash"}
        >
          Flash
        </button>

        <div className="zoom">
          {zoomsDisponiveis.map((valor) => (
            <button
              key={valor}
              className={zoom === valor ? "zoom-item zoom-ativo" : "zoom-item"}
              onClick={() => trocarZoom(valor)}
              aria-label={"Zoom de " + valor + " vezes"}
            >
              {valor}x
            </button>
          ))}
        </div>

        <button
          className={cameraFrontal ? "controle controle-ligado" : "controle"}
          onClick={virarCamera}
          title="Virar a camera"
          aria-label="Virar a camera"
        >
          Virar
        </button>
      </div>

      <Visor tipo="livro" frontal={cameraFrontal} clarao={clarao}>
        <div className="sugestao">
          <p className="sugestao-titulo">Sugestao da JOVI</p>
          <p className="sugestao-texto">
            Parece um livro aberto. Quer ouvir a leitura desta pagina?
          </p>
          <button className="botao" onClick={() => aoTrocarTela("estudo")}>
            Abrir Modo Estudo
          </button>
        </div>

        <div className="linha-obturador">
          <span
            className="miniatura"
            style={{ backgroundColor: corDaMiniatura }}
            title={fotosTiradas + " foto(s) nesta sessao"}
          ></span>

          <BotaoObturador aoCapturar={tirarFoto} rotulo="Tirar foto" />

          <span className="miniatura miniatura-vazia"></span>
        </div>
      </Visor>

      <div className="numeros">
        <div className="numero">
          <strong>{totalSalvos}</strong>
          <span>itens salvos</span>
        </div>
        <div className="numero">
          <strong>{fotosTiradas}</strong>
          <span>fotos</span>
        </div>
        <div className="numero">
          <strong>{mediaDeAcerto}%</strong>
          <span>acerto medio</span>
        </div>
      </div>
    </div>
  );
}

export default TelaCamera;
