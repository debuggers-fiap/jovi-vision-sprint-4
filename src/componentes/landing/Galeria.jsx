// Secao Galeria: as telas do aplicativo em funcionamento.
//
// Grid Container: uma coluna no celular, duas no tablet e tres no desktop.
// O primeiro item tem destaque e ocupa duas linhas no desktop - e um Grid
// Item com tamanho diferente dos outros.
//
// Recebe a lista de telas por props.

import TopoDaSecao from "./TopoDaSecao.jsx";

function Galeria({ telas }) {
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-16">
      <TopoDaSecao
        etiqueta="Galeria"
        titulo="Como a solucao funciona na pratica."
        linha="Telas do aplicativo em funcionamento. Os textos que aparecem reconhecidos sao exemplos, usados para demonstrar cada modo."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {telas.map((tela) => (
          <figure
            key={tela.imagem}
            className={
              tela.destaque
                ? "overflow-hidden rounded-2xl border border-rosa/50 bg-caixa lg:row-span-2"
                : "overflow-hidden rounded-2xl border border-borda bg-caixa"
            }
          >
            <img
              src={tela.imagem}
              alt={tela.alternativo}
              loading="lazy"
              width="768"
              height="1440"
              className="mx-auto block w-full max-w-[260px] p-4"
            />
            <figcaption className="border-t border-borda p-4">
              <strong className="block text-texto">{tela.titulo}</strong>
              <span className="mt-1 block text-sm text-texto-fraco">
                {tela.legenda}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Galeria;
