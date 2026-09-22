// Funcoes que fazem o aplicativo ler o texto em voz alta.
// Usam o speechSynthesis, o recurso de sintese de voz que ja vem
// dentro do proprio navegador. Nao e biblioteca externa: e o mesmo
// recurso que o site da Sprint 2 ja usava.

// Diz se o navegador do usuario tem o recurso de voz.
export function navegadorSabeFalar() {
  return "speechSynthesis" in window;
}

// Le o texto em voz alta.
// velocidade: 0.5 e bem devagar, 1 e o normal, 2 e bem rapido.
// volume: de 0 a 100, como aparece na tela de Acessibilidade.
// aoTerminar: funcao chamada quando a leitura acaba sozinha.
export function falar(texto, velocidade, volume, idioma, aoTerminar) {
  if (!navegadorSabeFalar()) {
    return false;
  }

  // Cancela o que estiver sendo lido antes de comecar a proxima leitura,
  // para as vozes nunca ficarem falando por cima uma da outra.
  window.speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = idioma;
  fala.rate = velocidade;
  // O navegador espera o volume de 0 a 1, por isso a divisao por 100.
  fala.volume = volume / 100;
  fala.onend = aoTerminar;

  window.speechSynthesis.speak(fala);
  return true;
}

// Interrompe a leitura na hora.
export function pararDeFalar() {
  if (navegadorSabeFalar()) {
    window.speechSynthesis.cancel();
  }
}
