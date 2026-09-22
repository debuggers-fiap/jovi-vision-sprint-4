// Secao A Solucao: explica o problema e apresenta os modos da camera.
//
// Grid Container dos cartoes: uma coluna no celular, duas no tablet e
// quatro no desktop. Cada cartao e um Grid Item.
//
// Recebe a lista de modos por props.

import TopoDaSecao from "./TopoDaSecao.jsx";

function Solucao({ modos }) {
  return (
    <section id="solucao" className="mx-auto max-w-6xl px-4 py-16">
      <TopoDaSecao
        etiqueta="A Solucao"
        titulo="O problema nao e a falta de tecnologia. E a falta de acesso."
        linha="Em sala de aula o conteudo e visual: o professor escreve na lousa e apaga, o slide passa, a apostila e impressa. O estudante com deficiencia visual depende de um colega ditar ou de alguem digitalizar o material depois. O JOVI Vision resolve isso dentro da camera que ele ja usa - nao e um aplicativo para descobrir, baixar e configurar."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {modos.map((modo) => (
          <article
            key={modo.titulo}
            className="rounded-2xl border border-borda bg-caixa p-6 transition-colors hover:border-azul"
          >
            <span aria-hidden="true" className="text-3xl">
              {modo.icone}
            </span>
            <h3 className="mt-4 text-lg font-bold text-texto">{modo.titulo}</h3>
            <p className="mt-2 text-sm text-texto-fraco">{modo.descricao}</p>
          </article>
        ))}
      </div>

      <aside className="mt-8 rounded-2xl border border-azul/40 bg-azul/10 p-6">
        <h3 className="text-lg font-bold text-azul">Como funciona por dentro</h3>
        <p className="mt-2 text-texto-fraco">
          O reconhecimento de texto, a leitura em voz alta e a visao computacional
          rodam no proprio aparelho, com tecnologias abertas e gratuitas. Nada
          exige hardware novo nem servidor proprio - e por isso que a proposta e
          viavel como recurso de fabrica da JOVI.
        </p>
      </aside>
    </section>
  );
}

export default Solucao;
