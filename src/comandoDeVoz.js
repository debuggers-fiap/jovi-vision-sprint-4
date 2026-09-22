// Comando de voz: "Ei JOVI, abrir o modo estudo".
// Usa o SpeechRecognition, o recurso de reconhecimento de fala que ja
// vem no proprio navegador. Assim como a voz que le em voz alta, nao e
// biblioteca externa nem precisa de internet paga.
//
// Observacao: o navegador pede permissao para usar o microfone. Por isso
// a funcao so e ligada quando o usuario ativa a chave em Acessibilidade.

// Diz se o navegador do usuario tem o recurso de reconhecimento de fala.
export function navegadorSabeOuvir() {
  return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
}

// Descobre qual tela o estudante pediu, olhando as palavras da frase.
// Se a frase nao tiver nenhuma palavra conhecida, devolve null.
export function descobrirTela(frase) {
  const texto = frase.toLowerCase();

  if (texto.includes("estudo") || texto.includes("livro")) {
    return "estudo";
  }
  if (texto.includes("lousa") || texto.includes("quadro")) {
    return "lousa";
  }
  if (texto.includes("digitalizar") || texto.includes("documento")) {
    return "digitalizar";
  }
  if (texto.includes("arquivo") || texto.includes("biblioteca")) {
    return "pdf";
  }
  if (texto.includes("acessibilidade") || texto.includes("ajuste")) {
    return "acessibilidade";
  }
  if (texto.includes("camera") || texto.includes("câmera") || texto.includes("foto")) {
    return "camera";
  }
  return null;
}

// Monta o ouvinte que fica esperando o comando falado.
// aoEntender recebe o nome da tela e a frase que foi ouvida.
export function criarOuvinte(aoEntender, aoNaoEntender) {
  if (!navegadorSabeOuvir()) {
    return null;
  }

  const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const ouvinte = new Reconhecimento();

  ouvinte.lang = "pt-BR";
  ouvinte.continuous = true;
  ouvinte.interimResults = false;

  ouvinte.onresult = function (evento) {
    const ultimo = evento.results[evento.results.length - 1];
    const frase = ultimo[0].transcript.trim();
    const tela = descobrirTela(frase);

    if (tela) {
      aoEntender(tela, frase);
    } else {
      aoNaoEntender(frase);
    }
  };

  return ouvinte;
}
