# JOVI Vision — Sprint 4

Câmera assistiva com inteligência artificial para estudantes com deficiência
visual, desenvolvida para o **Challenge FIAP 2026** em parceria com a
**JOVI Smartphone**.

Esta é a entrega da **Sprint 4**, feita em conjunto para as disciplinas de
**Front-End Design** e **Web Development**. É a evolução do mesmo projeto da
Sprint 3: a Landing Page, que antes era um site separado em HTML e CSS, agora
faz parte do próprio projeto React, junto com o aplicativo.

## Equipe Debuggers — Turma 1ESPG-2026

| Nome completo | RM | Função no projeto |
|---|---|---|
| Enrico Vieira de Almeida Vidal | RM569217 | Desenvolvimento e coordenação técnica |
| Vinícius Fuentes Cavalcanti | RM570818 | Pesquisa e documentação |
| Thiago Fernandes Kulesza | RM568922 | Modelagem e requisitos |
| Guilherme De Rosa Peres | RM569193 | Design e experiência do usuário |

## Links da entrega

- **Deploy na Vercel:** <https://jovi-vision-sprint-4.vercel.app>
- **Repositório Git:** `PREENCHER_APOS_CRIAR_O_REPOSITORIO`

## Tecnologias utilizadas

| Tecnologia | Versão | Para que serve no projeto |
|---|---|---|
| React | 18.3 | Biblioteca que monta a interface em componentes |
| React Router | 7.18 | As rotas públicas e privadas do projeto |
| Tailwind CSS | 4.3 | Estilização da Landing Page e da estrutura do aplicativo |
| Vite | 5.4 | Servidor de desenvolvimento e empacotamento |
| Funções Serverless da Vercel | — | A API do projeto, na pasta `api/` |

Nenhuma outra biblioteca foi usada. A leitura em voz alta e o reconhecimento de
comandos falados usam recursos que já vêm no próprio navegador
(`SpeechSynthesis` e `SpeechRecognition`), sem instalar nada.

## Como instalar as dependências

É necessário ter o **Node.js 18 ou superior** instalado.

```bash
npm install
```

## Como executar o projeto

```bash
npm run dev
```

O endereço aparece no terminal, normalmente <http://localhost:5173>.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Como executar os servidores (back-end)

**Não é preciso ligar nenhum servidor à parte.**

O projeto tem um back-end próprio, que são as duas funções na pasta `api/`. Em
produção, quem executa essas funções é a Vercel. Rodando na sua máquina, o
`npm run dev` já responde nos mesmos endereços — há um pequeno plugin no
`vite.config.js` que usa exatamente os mesmos arquivos da pasta `api/`.

Ou seja: `npm install` e `npm run dev` bastam, e a API funciona nos dois lugares.

| Endereço | Método | O que faz |
|---|---|---|
| `/api/conteudos` | GET | Devolve o acervo de textos que o aplicativo reconhece |
| `/api/biblioteca` | POST | Registra um item salvo e devolve código, data e tamanho |

Para testar a API direto pelo terminal, com o projeto rodando:

```bash
curl http://localhost:5173/api/conteudos

curl -X POST http://localhost:5173/api/biblioteca \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Teste\",\"texto\":\"Texto de exemplo para salvar.\"}"
```

**Uma observação honesta:** este back-end **não tem banco de dados**. Ele entrega
o acervo e identifica os itens salvos (gera o código `DOC-0000`, a data e o
tamanho), mas não guarda a lista. Os itens salvos pelo usuário continuam no
`localStorage` do próprio navegador. Se a API não responder, o aplicativo avisa
na tela e continua funcionando com uma cópia local dos textos — ele nunca falha
em silêncio.

## Usuários e senhas para teste

O aplicativo tem tela de login. Use a conta pronta para teste:

| Campo | Valor |
|---|---|
| E-mail | `demo@jovi.com` |
| Senha | `123456` |

Esses dados também aparecem escritos na própria tela de login, para não ser
preciso consultar este arquivo na hora de testar.

A tela também tem a opção **Criar conta**, que cadastra um usuário novo (nome,
RM, e-mail e senha de pelo menos 6 caracteres). Depois de criar, a tela volta
para a aba de entrar com o e-mail já preenchido. A conta criada vale enquanto a
página não for recarregada — não há banco de dados para guardá-la.

A Landing Page é pública e não pede login.

## Onde e como a IA foi utilizada no projeto

O código desta Sprint foi escrito em conjunto: parte pela equipe e parte com
apoio de IA, usada como assistente de programação. A proposta da Challenge, as
decisões de escopo, a identidade visual e o conteúdo do site são da equipe, que
revisou e testou todo o resultado antes da entrega.

## Novas funcionalidades desta Sprint

A Sprint 4 pede a evolução do projeto da Sprint 3 **acrescentando novas
funcionalidades**. Três entraram, todas na tela **Arquivos** (`/app/arquivos`),
que é onde ficam os textos e documentos que o estudante salvou:

| Funcionalidade | O que faz | Onde está |
|---|---|---|
| **Busca na biblioteca** | Filtra os itens salvos por título, pelo conteúdo do texto ou pelo código. Ignora maiúsculas e acentos, então procurar por `matematica` encontra "Matemática". | `src/hooks/useBuscaNaBiblioteca.js` |
| **Estatísticas de uso** | Total de itens, acerto médio, melhor leitura, palavras reconhecidas, espaço usado e qual foi o item mais recente. Os cálculos usam o objeto `Math`. | `src/componentes/EstatisticasDaBiblioteca.jsx` |
| **Exportar a biblioteca** | Baixa tudo o que foi salvo num arquivo `.txt`, para o estudante levar o conteúdo para fora do aplicativo. | `baixarBiblioteca()` em `src/componentes/TelaPdf.jsx` |

Na Sprint 3, essa tela só listava os itens salvos.

## O que a Sprint 4 pedia, e onde está cada coisa

| Requisito | Onde está no projeto |
|---|---|
| **React** com componentização e props | `src/componentes/` e `src/paginas/` |
| **Rotas públicas** | `/` (Landing) e `/login`, em `src/App.jsx` |
| **Rotas privadas** | `/app/*`, protegidas por `src/componentes/RotaPrivada.jsx` |
| **Hooks nativos** | `useState`, `useEffect`, `useRef`, `useNavigate`, `useLocation` |
| **Hooks customizados** | Os 9 arquivos de `src/hooks/` |
| **Tailwind CSS** | Toda a Landing Page e a estrutura do aplicativo |
| **Responsividade** | Desktop, Tablet e Mobile — medido, veja abaixo |
| **Consumo de API** | `src/servicoDaApi.js` e o hook `src/hooks/useConteudos.js` |
| **Landing integrada ao React** | `src/paginas/Landing.jsx` e `src/componentes/landing/` |
| **Novas funcionalidades** | Busca, estatísticas e exportar — veja a seção acima |
| **Deploy Git + Vercel** | Veja os links no início deste arquivo |

### Sobre o Tailwind e o CSS que sobrou

A Landing Page inteira é feita com classes do Tailwind, e as cores e fontes do
projeto estão definidas como tokens do Tailwind no `@theme`, dentro de
`src/estilos.css`.

O que continua em CSS comum, dentro de `@layer components`, é a **simulação do
aparelho**: a moldura do celular, o visor da câmera e as animações. Essa parte
foi mantida assim de propósito — escrita em Tailwind, ela viraria um monte de
classe como `rounded-[46px] shadow-[0_30px_70px_rgba(0,0,0,0.7)]`, que é mais
difícil de ler do que o CSS original, sem ganhar nada em troca.

O `@layer` importa: sem ele, esse CSS antigo ganharia de todas as classes do
Tailwind na cascata, e a Landing Page apareceria sem margem nenhuma.

## Rotas do projeto

```
PÚBLICAS
  /                       Landing Page com as seções da solução
  /login                  Entrada do aplicativo

PRIVADAS (exigem login)
  /app                    Câmera
  /app/estudo             Modo Estudo — lê o livro em voz alta
  /app/lousa              Scanner de Lousa
  /app/digitalizar        Digitalizar documento e gerar PDF
  /app/arquivos           Biblioteca de itens salvos
  /app/acessibilidade     Preferências de leitura e contraste
```

Quem não estiver logado e tentar abrir `/app` é levado para `/login`.

## Estrutura de pastas

```
jovi-vision-sprint-4/
├── api/                        A API do projeto (funções serverless)
│   ├── conteudos.js            GET  — acervo de textos
│   └── biblioteca.js           POST — registra um item salvo
│
├── public/img/                 Imagens da Galeria da Landing Page
│
├── src/
│   ├── App.jsx                 Autenticação e rotas do projeto
│   ├── main.jsx                Ponto de entrada, com o BrowserRouter
│   ├── estilos.css             Tokens do Tailwind e CSS do aparelho
│   ├── servicoDaApi.js         As chamadas fetch para a API
│   │
│   ├── paginas/
│   │   ├── Landing.jsx         Página pública da solução
│   │   ├── Login.jsx           Página pública de entrada
│   │   └── Aplicativo.jsx      Página privada, com as rotas internas
│   │
│   ├── componentes/
│   │   ├── landing/            As seções da Landing Page
│   │   ├── RotaPrivada.jsx     Protege as rotas privadas
│   │   └── ...                 Telas e peças do aplicativo
│   │
│   ├── hooks/                  Os hooks customizados
│   └── dados/                  Textos usados como exemplo
│
├── INTEGRANTES.TXT
└── README.md
```

## Os hooks customizados

Eles existem para tirar a lógica de dentro das telas: a tela desenha, o hook
resolve. Foi assim que o `App.jsx` saiu de 321 linhas na Sprint 3 para 90.

| Hook | Do que cuida |
|---|---|
| `useArmazenamento` | Um estado que se grava sozinho no navegador |
| `useAutenticacao` | Quem está logado, entrar e sair |
| `useConfiguracoes` | Velocidade, volume, contraste e modo offline |
| `useAviso` | A mensagem que aparece e some sozinha |
| `useBiblioteca` | Os itens salvos, e o envio deles para a API |
| `useConteudos` | Busca o acervo na API, com carregando e erro |
| `useComandoDeVoz` | Liga e desliga o microfone |
| `useFormularioDeContato` | Os campos e a validação do formulário |
| `useBuscaNaBiblioteca` | A busca e os números de uso da biblioteca |

## Responsividade

Medida com a página em um quadro de largura fixa, conferindo se algum elemento
passa da borda:

| Tela | Largura | Resultado |
|---|---|---|
| Landing — Desktop | 1280 px | cabe, sem transbordo |
| Landing — Tablet | 768 px | cabe, sem transbordo |
| Landing — Mobile | 390 px | cabe, sem transbordo |
| Login — Desktop | 1280 px | cabe, sem transbordo |
| Login — Mobile | 390 px | cabe, sem transbordo |

---

**FIAP** · Engenharia de Software · Challenge 2026 · Parceria JOVI Smartphone
Projeto acadêmico, desenvolvido para fins educacionais.
