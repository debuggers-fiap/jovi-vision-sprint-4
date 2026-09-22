// Funcoes que guardam e leem informacoes no localStorage do navegador.
// E por causa delas que as configuracoes e a biblioteca continuam
// salvas mesmo depois de fechar ou recarregar a pagina.

export function salvarNoNavegador(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function lerDoNavegador(chave, valorPadrao) {
  const dado = localStorage.getItem(chave);
  if (dado === null) {
    return valorPadrao;
  }
  return JSON.parse(dado);
}

export function apagarDoNavegador(chave) {
  localStorage.removeItem(chave);
}
