// API do JOVI Vision - acervo de conteudos
//
// Esta e a nossa propria API, publicada junto com o site na Vercel.
// Ela responde no endereco /api/conteudos
//
// Ate a Sprint 3 estes textos ficavam dentro do codigo do site, num arquivo
// que o navegador baixava junto com a pagina. Agora eles moram no servidor e
// o site busca por fetch, que e o que a Sprint 4 pede.

// Textos que simulam o que a camera reconheceu em um livro ou apostila.
const textosDeLivro = [
  {
    titulo: "Apostila de Biologia",
    texto:
      "A fotossintese e o processo pelo qual as plantas convertem luz solar, agua e CO2 em glicose e oxigenio. O processo acontece nos cloroplastos, organelas que contem clorofila.",
  },
  {
    titulo: "Fisica - Leis de Newton",
    texto:
      "Newton formulou as tres leis do movimento que descrevem a relacao entre forcas e aceleracao dos corpos. A segunda lei diz que a forca e igual a massa vezes a aceleracao.",
  },
  {
    titulo: "Historia - Revolucao Industrial",
    texto:
      "A Revolucao Industrial iniciou-se na Inglaterra no seculo XVIII, transformando a producao artesanal em producao industrial. As fabricas passaram a concentrar trabalhadores em um mesmo espaco.",
  },
  {
    titulo: "Matematica - Teorema de Pitagoras",
    texto:
      "O teorema de Pitagoras afirma que o quadrado da hipotenusa e igual a soma dos quadrados dos catetos. Vale para todo triangulo retangulo.",
  },
];

// Textos que simulam o que a camera reconheceu na lousa da sala.
const textosDeLousa = [
  {
    titulo: "Biologia - Fotossintese",
    texto:
      "Equacao da Fotossintese: 6CO2 + 6H2O + luz -> C6H12O6 + 6O2. Processo ocorre nos cloroplastos. Prova na sexta-feira.",
  },
  {
    titulo: "Matematica - Equacao do 2o grau",
    texto:
      "Formula de Bhaskara: x = (-b +- raiz de delta) / 2a, onde delta = b ao quadrado - 4ac. Exercicio para casa: paginas 88 e 89, questoes 1 ate 7.",
  },
  {
    titulo: "Quimica - Tabela periodica",
    texto:
      "Os metais alcalinos estao na coluna 1A e possuem um eletron na camada de valencia. Sao muito reativos e por isso nao aparecem isolados na natureza.",
  },
];

// Documentos que o modo Digitalizar transforma em PDF.
const documentosSimulados = [
  {
    titulo: "Apostila de Biologia",
    arquivo: "Apostila_Bio.pdf",
    texto:
      "Capitulo 4 - Fotossintese. A fotossintese e o processo pelo qual as plantas convertem luz solar, agua e CO2 em glicose e oxigenio. Exercicios nas paginas 88 e 89.",
  },
  {
    titulo: "Lista de exercicios",
    arquivo: "Lista_Exercicios.pdf",
    texto:
      "Questao 1: calcule a area do triangulo de base 8 cm e altura 5 cm. Questao 2: determine o perimetro de um retangulo com lados 12 cm e 7 cm. Entrega ate quarta-feira.",
  },
  {
    titulo: "Comunicado da escola",
    arquivo: "Comunicado_Escola.pdf",
    texto:
      "Reuniao de pais e mestres marcada para o dia 20, as 19 horas, no auditorio. Pedimos a presenca de ao menos um responsavel por aluno.",
  },
];

export default function handler(requisicao, resposta) {
  // Esta rota so responde a GET. Qualquer outro metodo recebe um aviso claro,
  // em vez de falhar em silencio.
  if (requisicao.method !== "GET") {
    return resposta.status(405).json({
      ok: false,
      mensagem: "Esta rota aceita apenas GET.",
    });
  }

  return resposta.status(200).json({
    ok: true,
    atualizadoEm: new Date().toISOString(),
    livro: textosDeLivro,
    lousa: textosDeLousa,
    documentos: documentosSimulados,
  });
}
