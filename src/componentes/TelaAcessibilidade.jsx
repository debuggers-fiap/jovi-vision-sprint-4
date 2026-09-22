// Tela de acessibilidade e configuracoes.
// Traz as mesmas opcoes que o prototipo da Sprint 2 tinha: leitura
// automatica, velocidade da voz, volume, comando de voz, alto contraste
// e modo offline.
// Recebe do App as configuracoes atuais e a funcao que altera cada uma.
// Tudo o que muda aqui e guardado no localStorage pelo App.

function TelaAcessibilidade({
  config,
  aoMudarConfig,
  aoLimparBiblioteca,
  totalSalvos,
  usuario,
}) {
  return (
    <div className="tela tela-conteudo">
      <section className="grupo">
        <h2 className="secao-titulo">Audio</h2>

        <div className="opcao">
          <div>
            <p className="opcao-nome">Leitura automatica</p>
            <p className="opcao-info">Le o texto assim que ele e reconhecido</p>
          </div>
          <button
            className={config.leituraAutomatica ? "chave chave-ligada" : "chave"}
            onClick={() => aoMudarConfig("leituraAutomatica", !config.leituraAutomatica)}
          >
            {config.leituraAutomatica ? "Ligado" : "Desligado"}
          </button>
        </div>

        <div className="controle-faixa">
          <label className="faixa-titulo" htmlFor="velocidade">
            <span>Velocidade da voz</span>
            <span className="faixa-valor">{config.velocidade}x</span>
          </label>
          <input
            id="velocidade"
            className="faixa"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={config.velocidade}
            onChange={(evento) =>
              aoMudarConfig("velocidade", Number(evento.target.value))
            }
          />
        </div>

        <div className="controle-faixa">
          <label className="faixa-titulo" htmlFor="volume">
            <span>Volume</span>
            <span className="faixa-valor">{config.volume}%</span>
          </label>
          <input
            id="volume"
            className="faixa"
            type="range"
            min="0"
            max="100"
            step="5"
            value={config.volume}
            onChange={(evento) => aoMudarConfig("volume", Number(evento.target.value))}
          />
        </div>
      </section>

      <section className="grupo">
        <h2 className="secao-titulo">Navegacao</h2>

        <div className="opcao">
          <div>
            <p className="opcao-nome">Comando de voz "Ei JOVI"</p>
            <p className="opcao-info">Abre os modos sem precisar tocar na tela</p>
          </div>
          <button
            className={config.comandoDeVoz ? "chave chave-ligada" : "chave"}
            onClick={() => aoMudarConfig("comandoDeVoz", !config.comandoDeVoz)}
          >
            {config.comandoDeVoz ? "Ligado" : "Desligado"}
          </button>
        </div>

        <div className="opcao">
          <div>
            <p className="opcao-nome">Alto contraste</p>
            <p className="opcao-info">Aumenta a diferenca entre texto e fundo</p>
          </div>
          <button
            className={config.altoContraste ? "chave chave-ligada" : "chave"}
            onClick={() => aoMudarConfig("altoContraste", !config.altoContraste)}
          >
            {config.altoContraste ? "Ligado" : "Desligado"}
          </button>
        </div>
      </section>

      <section className="grupo">
        <h2 className="secao-titulo">Privacidade</h2>

        <div className="opcao">
          <div>
            <p className="opcao-nome">Modo offline</p>
            <p className="opcao-info">Processa tudo no aparelho, sem internet</p>
          </div>
          <button
            className={config.modoOffline ? "chave chave-ligada" : "chave"}
            onClick={() => aoMudarConfig("modoOffline", !config.modoOffline)}
          >
            {config.modoOffline ? "Ligado" : "Desligado"}
          </button>
        </div>
      </section>

      <section className="grupo">
        <h2 className="secao-titulo">Dados guardados</h2>
        <p className="opcao-info">
          Ha {totalSalvos} itens salvos na memoria do navegador. Voce entrou
          como <strong>{usuario.email}</strong>.
        </p>
        <button className="botao botao-perigo" onClick={aoLimparBiblioteca}>
          Limpar a biblioteca
        </button>
      </section>
    </div>
  );
}

export default TelaAcessibilidade;
