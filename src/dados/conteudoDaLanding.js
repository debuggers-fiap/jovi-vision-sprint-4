// Conteudo escrito da Landing Page.
//
// Separar o texto do desenho deixa as secoes mais curtas: cada componente
// so se preocupa em desenhar, e recebe estas listas por props.

// Os quatro numeros que aparecem logo abaixo da abertura.
export const numerosDoProjeto = [
  { valor: "6,5 mi", rotulo: "brasileiros com deficiencia visual" },
  { valor: "Nativo", rotulo: "vem no aparelho, sem baixar nada" },
  { valor: "R$ 0", rotulo: "sem assinatura para o usuario" },
  { valor: "Offline", rotulo: "funciona sem internet e sem enviar dados" },
];

// Os modos da camera apresentados na secao A Solucao.
export const modosDaSolucao = [
  {
    icone: "📖",
    titulo: "Modo Estudo",
    descricao:
      "Aponte para qualquer texto e ouca em voz alta. Da para traduzir, copiar e guardar na biblioteca.",
  },
  {
    icone: "🧮",
    titulo: "Scanner de Lousa",
    descricao:
      "Captura o que esta escrito no quadro, inclusive a mao, e converte em texto que pode ser ouvido na hora.",
  },
  {
    icone: "📄",
    titulo: "Digitalizar",
    descricao:
      "Encontra o documento sozinho, recorta e gera um PDF pronto para salvar e compartilhar com a turma.",
  },
  {
    icone: "🔊",
    titulo: "Assistencia sonora",
    descricao:
      "Um som guia o enquadramento e a vibracao confirma cada acao - para quem nao ve a tela.",
  },
];

// As telas do aplicativo mostradas na Galeria.
export const telasDaGaleria = [
  {
    imagem: "/img/01-sugestao.jpg",
    alternativo:
      "Tela da camera do JOVI Vision com o cartao Sugestao da JOVI dizendo que parece um livro aberto e oferecendo abrir o Modo Estudo.",
    titulo: "A camera sugere o modo",
    legenda: "Percebe que ha um livro a frente e ja oferece abrir o Modo Estudo.",
    destaque: true,
  },
  {
    imagem: "/img/02-estudo.jpg",
    alternativo:
      "Modo Estudo aberto, com a pagina no visor e o botao de ler a pagina em voz alta.",
    titulo: "Modo Estudo",
    legenda: "Aponte para a pagina e ouca o conteudo em voz alta.",
    destaque: false,
  },
  {
    imagem: "/img/03-texto-reconhecido.jpg",
    alternativo:
      "Painel com o texto reconhecido de uma pagina, mostrando a quantidade de palavras e o grau de confianca da leitura.",
    titulo: "Texto reconhecido",
    legenda: "Mostra quantas palavras foram lidas e o grau de confianca.",
    destaque: false,
  },
  {
    imagem: "/img/04-traducao.jpg",
    alternativo:
      "O mesmo texto reconhecido, agora traduzido para o ingles, com os botoes de ouvir, voltar ao original, copiar e salvar.",
    titulo: "Traducao na hora",
    legenda: "O mesmo texto em outro idioma - e tambem lido em voz alta.",
    destaque: false,
  },
  {
    imagem: "/img/05-lousa.jpg",
    alternativo:
      "Scanner de Lousa com o conteudo do quadro capturado e exibido em um painel.",
    titulo: "Scanner de Lousa",
    legenda: "Captura o que o professor escreveu durante a aula.",
    destaque: false,
  },
  {
    imagem: "/img/06-acessibilidade.jpg",
    alternativo:
      "Tela de acessibilidade com leitura automatica, velocidade da voz, volume, comando de voz, alto contraste e modo offline.",
    titulo: "Acessibilidade",
    legenda: "Tudo configuravel e guardado no proprio aparelho.",
    destaque: false,
  },
];

// A equipe, com a funcao de cada integrante no projeto.
export const equipeDoProjeto = [
  {
    nome: "Enrico Vieira de Almeida Vidal",
    rm: "RM569217",
    funcao: "Desenvolvimento e coordenacao tecnica",
  },
  {
    nome: "Vinicius Fuentes Cavalcanti",
    rm: "RM570818",
    funcao: "Pesquisa e documentacao",
  },
  {
    nome: "Thiago Fernandes Kulesza",
    rm: "RM568922",
    funcao: "Modelagem e requisitos",
  },
  {
    nome: "Guilherme De Rosa Peres",
    rm: "RM569193",
    funcao: "Design e experiencia do usuario",
  },
];

// Os links do menu de navegacao da Landing Page.
export const secoesDoMenu = [
  { id: "solucao", nome: "A Solucao" },
  { id: "publico", nome: "Publico-Alvo" },
  { id: "galeria", nome: "Galeria" },
  { id: "equipe", nome: "Nossa Equipe" },
  { id: "contato", nome: "Contato" },
];
