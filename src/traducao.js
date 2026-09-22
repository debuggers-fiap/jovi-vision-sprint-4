// Traducao simulada de portugues para ingles.
// Funciona com um dicionario de palavras: o programa percorre a lista,
// troca as palavras que conhece e mantem o resto do texto como estava.
// E a mesma ideia que ja tinha sido usada no site da Sprint 2.
//
// Nao e uma traducao de verdade e nao acessa a internet: serve para
// demonstrar a funcionalidade dentro do prototipo.

const dicionario = {
  // ligacao e uso geral
  "e o processo": "is the process",
  "por isso": "for this reason",
  "ate quarta-feira": "until Wednesday",
  "proxima sexta-feira": "next Friday",
  "sexta-feira": "Friday",
  "pelo qual": "through which",
  "dentro do": "inside the",
  "ao menos": "at least",
  "que contem": "that contain",
  "para casa": "for home",
  "por aluno": "per student",

  // ciencias
  fotossintese: "photosynthesis",
  plantas: "plants",
  convertem: "convert",
  "luz solar": "sunlight",
  agua: "water",
  "gas carbonico": "carbon dioxide",
  glicose: "glucose",
  oxigenio: "oxygen",
  cloroplastos: "chloroplasts",
  organelas: "organelles",
  clorofila: "chlorophyll",
  metais: "metals",
  eletron: "electron",
  camada: "layer",
  reativos: "reactive",
  natureza: "nature",
  movimento: "movement",

  // matematica
  formula: "formula",
  raiz: "square root",
  quadrado: "square",
  calcule: "calculate",
  area: "area",
  triangulo: "triangle",
  base: "base",
  altura: "height",
  perimetro: "perimeter",
  retangulo: "rectangle",
  lados: "sides",
  questao: "question",
  questoes: "questions",
  exercicio: "exercise",
  exercicios: "exercises",

  // escola
  prova: "test",
  materia: "subject",
  capitulos: "chapters",
  capitulo: "chapter",
  livro: "book",
  pagina: "page",
  paginas: "pages",
  apostila: "workbook",
  aula: "class",
  escola: "school",
  reuniao: "meeting",
  pais: "parents",
  auditorio: "auditorium",
  presenca: "presence",
  responsavel: "guardian",
  entrega: "submission",
  unidade: "unit",
  oracao: "clause",
  oracoes: "clauses",
  exemplo: "example",
  espero: "I hope",

  // historia e literatura
  revolucao: "revolution",
  industrial: "industrial",
  comecou: "began",
  inglaterra: "England",
  seculo: "century",
  transformou: "transformed",
  producao: "production",
  artesanal: "handmade",
  mecanizada: "mechanized",
  fabricas: "factories",
  trabalhadores: "workers",
  cidades: "cities",
  cresceram: "grew",
  rapidamente: "quickly",
  rosto: "face",
  tarde: "afternoon",
  lembrei: "I remembered",
  voz: "voice",
  olhos: "eyes",
  tempo: "time",
  nunca: "never",

  // palavrinhas comuns
  processo: "process",
  acontece: "happens",
  possuem: "have",
  estao: "are",
  coluna: "column",
  dia: "day",
  horas: "hours",
  marcada: "scheduled",

  // conectivos e artigos, para a frase nao ficar meio em portugues
  a: "the",
  o: "the",
  as: "the",
  os: "the",
  um: "a",
  uma: "a",
  e: "and",
  em: "in",
  de: "of",
  da: "of the",
  do: "of the",
  das: "of the",
  dos: "of the",
  na: "in the",
  no: "in the",
  nos: "in the",
  que: "that",
  para: "for",
  com: "with",
  sao: "are",
  esse: "this",
  essa: "this",
  seu: "its",
  sua: "its",
  mas: "but",
  nao: "not",
  muito: "very",
  ao: "to the",
  onde: "where",
  ate: "until",
  durante: "during",
  tambem: "also",
  mesmo: "same",
  alguma: "some",
  coisa: "thing",
  voce: "you",
  eu: "I",
  dela: "of hers",
  naquela: "on that",
  havia: "there was",
  vezes: "times",

  // palavras que faltavam nos textos de exemplo do aplicativo
  uniforme: "uniform",
  alcalinos: "alkaline",
  valencia: "valence",
  isolados: "isolated",
  aparecem: "appear",
  concentrar: "concentrate",
  passaram: "started",
  espaco: "space",
  periodo: "sentence",
  subordinada: "subordinate",
  subordinadas: "subordinate",
  substantiva: "noun",
  substantivo: "noun",
  exerce: "performs",
  funcao: "function",
  orações: "clauses",
  venha: "come",
  determine: "determine",
  mestres: "teachers",
  pedimos: "we ask",
  recordar: "recall",
  consegui: "managed",
  soube: "knew",
  nomear: "name",
  explicou: "explained",

  // palavras dos textos de Fisica e Matematica
  "iniciou-se": "began",
  "ao quadrado": "squared",
  "e igual a": "is equal to",
  "e igual": "is equal",
  aceleracao: "acceleration",
  afirma: "states",
  catetos: "legs",
  corpos: "bodies",
  descrevem: "describe",
  diz: "says",
  entre: "between",
  equacao: "equation",
  forca: "force",
  forcas: "forces",
  formulou: "formulated",
  hipotenusa: "hypotenuse",
  igual: "equal",
  iniciou: "began",
  lei: "law",
  leis: "laws",
  luz: "light",
  massa: "mass",
  nas: "in the",
  ocorre: "occurs",
  quadrados: "squares",
  relacao: "relation",
  segunda: "second",
  soma: "sum",
  teorema: "theorem",
  todo: "every",
  transformando: "transforming",
  tres: "three",
  vale: "applies",
};

// Escapa os caracteres que teriam significado especial dentro de
// uma expressao regular, para a busca ser feita letra por letra.
function escapar(palavra) {
  return palavra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Deixa a primeira letra maiuscula, para nao perder o comeco da frase.
function comMaiuscula(palavra) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

// Troca no texto todas as palavras que existem no dicionario.
//
// A troca e feita de uma vez so, com uma unica busca montada a partir
// de todas as palavras juntas. Isso e importante: se trocassemos uma
// palavra de cada vez, uma palavra ja traduzida poderia ser traduzida
// outra vez pela regra seguinte. Exemplo do problema: "um" vira "a",
// e depois a regra de "a" transformaria esse "a" em "the".
//
// As expressoes maiores vem primeiro na busca para terem preferencia
// sobre as palavras soltas que existem dentro delas.
export function traduzir(texto) {
  const termos = Object.keys(dicionario);
  termos.sort(function (a, b) {
    return b.length - a.length;
  });

  const partes = termos.map(escapar);
  const busca = new RegExp("\\b(" + partes.join("|") + ")\\b", "gi");

  return texto.replace(busca, function (encontrado) {
    const traducao = dicionario[encontrado.toLowerCase()];

    // Se a palavra original comecava com maiuscula, a traducao tambem comeca.
    if (encontrado.charAt(0) === encontrado.charAt(0).toUpperCase()) {
      return comMaiuscula(traducao);
    }
    return traducao;
  });
}
