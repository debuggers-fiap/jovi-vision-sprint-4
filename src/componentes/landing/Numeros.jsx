// A faixa com os quatro numeros do projeto.
//
// Grid Container: duas colunas no celular e no tablet, quatro no desktop.
// Cada numero e um Grid Item.
//
// Recebe a lista por props.

function Numeros({ numeros }) {
  return (
    <section
      aria-label="O projeto em numeros"
      className="border-y border-borda bg-caixa"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4">
        {numeros.map((numero) => (
          <article key={numero.rotulo} className="text-center">
            <p className="font-mono text-2xl font-medium text-rosa md:text-3xl">
              {numero.valor}
            </p>
            <p className="mt-2 text-sm text-texto-fraco">{numero.rotulo}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Numeros;
