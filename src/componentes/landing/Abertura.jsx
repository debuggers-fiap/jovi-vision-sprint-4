// Primeira secao da Landing Page: a chamada principal.
//
// Grid Container de uma coluna no celular e duas colunas no desktop -
// texto de um lado, imagem do aplicativo do outro.

import { Link } from "react-router-dom";

function Abertura() {
  return (
    <section
      id="inicio"
      className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20"
    >
      <div>
        <p className="mb-4 font-mono text-sm tracking-wide text-azul">
          Challenge FIAP 2026 · JOVI Smartphone
        </p>

        <h1 className="text-4xl leading-tight font-bold text-texto md:text-5xl">
          A camera do seu celular aprendeu a estudar.
        </h1>

        <p className="mt-5 text-lg text-texto-fraco">
          O JOVI Vision le em voz alta o livro, a lousa e a apostila - para que o
          estudante com deficiencia visual acompanhe a aula sem depender de
          ninguem.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#solucao"
            className="rounded-full bg-rosa px-6 py-3 font-medium text-white transition-colors hover:bg-rosa-claro"
          >
            Conhecer a solucao
          </a>
          <Link
            to="/login"
            className="rounded-full border border-azul px-6 py-3 font-medium text-azul transition-colors hover:bg-azul hover:text-fundo"
          >
            Abrir o aplicativo
          </Link>
        </div>
      </div>

      <figure className="justify-self-center">
        <img
          src="/img/03-texto-reconhecido.jpg"
          alt="Tela do JOVI Vision mostrando o texto reconhecido de uma pagina e os botoes de ouvir, traduzir, copiar e salvar."
          width="768"
          height="1440"
          className="w-full max-w-[280px] rounded-3xl border border-moldura shadow-2xl"
        />
      </figure>
    </section>
  );
}

export default Abertura;
