// Componente filho: os numeros de uso da biblioteca.
//
// Mostra quanto ja foi reconhecido, com que qualidade e quanto espaco
// ocupa. Recebe tudo pronto por props - quem calcula e o hook
// useBuscaNaBiblioteca.

function EstatisticasDaBiblioteca({ estatisticas }) {
  if (estatisticas.total === 0) {
    return null;
  }

  const numeros = [
    { valor: estatisticas.total, rotulo: "itens salvos" },
    { valor: estatisticas.mediaDeAcerto + "%", rotulo: "acerto medio" },
    { valor: estatisticas.melhorAcerto + "%", rotulo: "melhor leitura" },
    { valor: estatisticas.totalDePalavras, rotulo: "palavras lidas" },
    { valor: estatisticas.espacoEmKb + " KB", rotulo: "espaco usado" },
  ];

  return (
    <section className="mt-3 rounded-xl border border-borda bg-caixa p-3">
      <h3 className="font-mono text-[10px] tracking-[1.4px] text-azul uppercase">
        Estatisticas de uso
      </h3>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {numeros.map((numero) => (
          <div key={numero.rotulo} className="text-center">
            <p className="font-mono text-base font-medium text-rosa tabular-nums">
              {numero.valor}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-texto-fraco">
              {numero.rotulo}
            </p>
          </div>
        ))}
      </div>

      {estatisticas.maisRecente && (
        <p className="mt-2.5 border-t border-borda pt-2 text-[11px] text-texto-fraco">
          Mais recente:{" "}
          <strong className="font-medium text-texto">
            {estatisticas.maisRecente.titulo}
          </strong>{" "}
          - {estatisticas.maisRecente.data}
        </p>
      )}
    </section>
  );
}

export default EstatisticasDaBiblioteca;
