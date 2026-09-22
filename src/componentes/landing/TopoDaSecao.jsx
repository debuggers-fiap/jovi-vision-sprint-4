// Componente reutilizado no comeco de cada secao da Landing Page:
// a etiqueta pequena, o titulo e a linha de apoio.
//
// Recebe tudo por props. A linha de apoio e opcional - quando nao vem,
// simplesmente nao aparece.

function TopoDaSecao({ etiqueta, titulo, linha }) {
  return (
    <header className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-sm tracking-wide text-azul">{etiqueta}</p>

      <h2 className="text-3xl leading-tight font-bold text-texto md:text-4xl">
        {titulo}
      </h2>

      {linha && <p className="mt-4 text-texto-fraco">{linha}</p>}
    </header>
  );
}

export default TopoDaSecao;
