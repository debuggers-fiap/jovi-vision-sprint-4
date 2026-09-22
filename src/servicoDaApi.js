// Conversa com a nossa API.
//
// A API do JOVI Vision fica publicada na Vercel, junto com o site, nas rotas
// /api/conteudos e /api/biblioteca. O codigo delas esta na pasta api/ do
// projeto.
//
// Como o endereco comeca com barra, o navegador entende "o mesmo servidor
// deste site". Em producao isso aponta para a Vercel; rodando na propria
// maquina, o Vite encaminha para la (a configuracao esta no vite.config.js).
//
// Nenhuma funcao daqui quebra o aplicativo sozinha: quando algo da errado,
// ela avisa com uma mensagem em portugues explicando o que aconteceu.

// Busca o acervo de conteudos que o aplicativo usa para simular o que a
// camera reconheceu.
export async function buscarConteudos() {
  const resposta = await fetch("/api/conteudos");

  if (!resposta.ok) {
    throw new Error("O servidor respondeu com o codigo " + resposta.status + ".");
  }

  const dados = await resposta.json();
  return dados;
}

// Manda para o servidor um texto que o usuario acabou de salvar.
// O servidor devolve o item ja com codigo, data e tamanho.
export async function registrarItem(dadosDoItem) {
  const resposta = await fetch("/api/biblioteca", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosDoItem),
  });

  if (!resposta.ok) {
    throw new Error("O servidor respondeu com o codigo " + resposta.status + ".");
  }

  const dados = await resposta.json();
  return dados.item;
}
