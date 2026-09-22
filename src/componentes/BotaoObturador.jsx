// Componente neto: o botao redondo de capturar.
// Aparece no Modo Estudo, no Scanner de Lousa e na Digitalizacao.
// Recebe da tela a funcao de capturar e se esta ocupado analisando.

function BotaoObturador({ aoCapturar, ocupado, rotulo }) {
  return (
    <div className="obturador-area">
      <p className="obturador-rotulo">{ocupado ? "Analisando..." : rotulo}</p>
      <button
        className={ocupado ? "obturador obturador-ocupado" : "obturador"}
        onClick={aoCapturar}
        disabled={ocupado}
        aria-label={ocupado ? "Analisando" : rotulo}
      >
        <span className="obturador-interno"></span>
      </button>
    </div>
  );
}

export default BotaoObturador;
