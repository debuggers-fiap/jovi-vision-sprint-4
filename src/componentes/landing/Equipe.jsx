// Secao Nossa Equipe: nome, RM e funcao de cada integrante.
//
// A funcao de cada um e exigida pela entrega, por isso aparece em destaque
// no cartao.
//
// Grid Container: uma coluna no celular, duas no tablet e quatro no
// desktop. Cada pessoa e um Grid Item.
//
// Recebe a lista de integrantes por props.

import TopoDaSecao from "./TopoDaSecao.jsx";

function Equipe({ integrantes, turma }) {
  return (
    <section id="equipe" className="border-y border-borda bg-caixa">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <TopoDaSecao
          etiqueta="Nossa Equipe"
          titulo="Debuggers"
          linha={"Turma " + turma + " · Engenharia de Software"}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {integrantes.map((pessoa) => (
            <article
              key={pessoa.rm}
              className="rounded-2xl border border-borda bg-fundo p-6 text-center"
            >
              <p
                aria-hidden="true"
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rosa text-xl font-bold text-white"
              >
                {pessoa.nome.charAt(0)}
              </p>

              <h3 className="mt-4 font-bold text-texto">{pessoa.nome}</h3>
              <p className="mt-1 font-mono text-sm text-azul">{pessoa.rm}</p>
              <p className="mt-3 text-sm text-texto-fraco">{pessoa.funcao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Equipe;
