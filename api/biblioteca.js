// API do JOVI Vision - registro de itens da biblioteca
//
// Esta e a nossa propria API, publicada junto com o site na Vercel.
// Ela responde no endereco /api/biblioteca
//
// Quando o usuario salva um texto reconhecido, o site manda o conteudo para
// esta rota e o servidor devolve o item ja identificado: com codigo, data e
// tamanho estimado do arquivo.
//
// Ate a Sprint 3 essas tres informacoes eram inventadas dentro do navegador.
// Agora quem decide e o servidor, que e o lugar certo: assim dois aparelhos
// diferentes nunca criam o mesmo codigo com regras diferentes.
//
// Importante: este back-end NAO tem banco de dados. Ele identifica o item e
// devolve, mas nao guarda nada. A lista dos itens salvos continua no proprio
// aparelho do usuario, no localStorage do navegador.

// Gera um codigo de identificacao no formato DOC-1234.
function gerarCodigo() {
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return "DOC-" + numero;
}

// Coloca um zero na frente enquanto o numero nao tiver o tamanho pedido.
function comZeros(numero, tamanho) {
  return String(numero).padStart(tamanho, "0");
}

// Monta a data e a hora do momento em que o item foi salvo.
function dataDeAgora() {
  const agora = new Date();
  const dia = comZeros(agora.getDate(), 2);
  const mes = comZeros(agora.getMonth() + 1, 2);
  const hora = comZeros(agora.getHours(), 2);
  const minuto = comZeros(agora.getMinutes(), 2);
  return dia + "/" + mes + " as " + hora + ":" + minuto;
}

// Estima o tamanho do arquivo em KB: 120 KB da imagem da pagina mais um
// pouco por letra reconhecida.
function estimarTamanho(texto) {
  return 120 + Math.round(texto.length / 8);
}

export default function handler(requisicao, resposta) {
  if (requisicao.method !== "POST") {
    return resposta.status(405).json({
      ok: false,
      mensagem: "Esta rota aceita apenas POST.",
    });
  }

  const corpo = requisicao.body || {};
  const titulo = corpo.titulo;
  const texto = corpo.texto;

  // Valida o que chegou antes de responder. Se faltar informacao, o site
  // precisa saber exatamente o que faltou.
  if (!titulo || !texto) {
    return resposta.status(400).json({
      ok: false,
      mensagem: "Faltou o titulo ou o texto do item.",
    });
  }

  const item = {
    codigo: gerarCodigo(),
    titulo: titulo,
    texto: texto,
    confianca: corpo.confianca || 0,
    tamanho: estimarTamanho(texto),
    data: dataDeAgora(),
  };

  return resposta.status(201).json({ ok: true, item: item });
}
