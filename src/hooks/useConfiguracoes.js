// Hook customizado: as preferencias de acessibilidade do usuario.
//
// Velocidade e volume da leitura, alto contraste, comando de voz e modo
// offline. Tudo continua salvo depois de fechar a pagina.

import { useArmazenamento } from "./useArmazenamento.js";
import { limitarVelocidade, limitarVolume } from "../funcoes.js";

// Como as configuracoes comecam quando o usuario abre o app pela primeira vez.
const configPadrao = {
  leituraAutomatica: true,
  velocidade: 1,
  volume: 80,
  altoContraste: false,
  // O comando de voz comeca desligado de proposito: liga-lo faz o navegador
  // pedir permissao para usar o microfone, e isso so deve acontecer quando
  // o usuario escolher usar a funcao.
  comandoDeVoz: false,
  modoOffline: false,
};

export function useConfiguracoes() {
  const [config, setConfig] = useArmazenamento("jovi_config", configPadrao);

  function mudarConfig(chave, valor) {
    // Velocidade e volume passam por um limite antes de serem guardados,
    // para nunca sair do intervalo que o aplicativo aceita.
    let valorTratado = valor;
    if (chave === "velocidade") {
      valorTratado = limitarVelocidade(valor);
    }
    if (chave === "volume") {
      valorTratado = limitarVolume(valor);
    }

    setConfig((anterior) => ({ ...anterior, [chave]: valorTratado }));
  }

  return { config, mudarConfig };
}
