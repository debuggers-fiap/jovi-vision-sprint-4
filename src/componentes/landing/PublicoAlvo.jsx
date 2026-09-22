// Secao Publico-Alvo: quem e beneficiado pela solucao e por que.
//
// Grid Container de uma coluna no celular e duas colunas de larguras
// diferentes no desktop (a persona ocupa o dobro do quadro lateral).

import TopoDaSecao from "./TopoDaSecao.jsx";

const dores = [
  "Nao consegue copiar a lousa antes de o professor apagar",
  "Depende de colegas para acessar apostilas impressas",
  "Recebe o material digitalizado so depois da aula",
];

function PublicoAlvo() {
  return (
    <section id="publico" className="border-y border-borda bg-caixa">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <TopoDaSecao
          etiqueta="Publico-Alvo"
          titulo="Para quem estuda, mas nao consegue enxergar o material."
        />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-2xl border border-borda bg-fundo p-6">
            <h3 className="text-xl font-bold text-texto">
              Estudante com deficiencia visual ou baixa visao
            </h3>
            <p className="mt-3 text-texto-fraco">
              Ensino medio ou superior, usuaria de smartphone Android. Ja usa
              recursos de acessibilidade no dia a dia e busca autonomia - nao
              mais um aplicativo para instalar e configurar.
            </p>

            <ul className="mt-5 grid gap-2">
              {dores.map((dor) => (
                <li key={dor} className="flex gap-3 text-sm text-texto-fraco">
                  <span aria-hidden="true" className="text-rosa">
                    ●
                  </span>
                  {dor}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-2xl border border-borda bg-fundo p-6">
            <h3 className="text-lg font-bold text-texto">
              E tambem todo o resto da turma
            </h3>
            <p className="mt-3 text-sm text-texto-fraco">
              Digitalizar apostila, capturar a lousa e ouvir um texto enquanto faz
              outra coisa sao recursos uteis para qualquer estudante. A
              acessibilidade entra como diferencial de marca, nao como nicho
              isolado.
            </p>
            <p className="mt-5 border-t border-borda pt-4 font-mono text-sm text-azul">
              Publico oficial do Challenge: <strong>Estudantes Full-time</strong>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default PublicoAlvo;
