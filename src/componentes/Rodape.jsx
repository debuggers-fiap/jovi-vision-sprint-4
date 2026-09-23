// Componente filho: a faixa de baixo, embaixo do aparelho.
// Recebe por props a lista de integrantes e o nome da turma.

function Rodape({ integrantes, turma }) {
  return (
    <footer className="max-w-96 text-center">
      <p className="font-mono text-[11px] tracking-[1.6px] text-rosa uppercase">
        Equipe Debuggers - {turma}
      </p>

      <p className="mt-1.5 text-[11px] leading-relaxed text-[#5d6675]">
        {integrantes.map((integrante) => (
          <span key={integrante.rm}>
            {integrante.nome} ({integrante.rm})
            <br />
          </span>
        ))}
      </p>
    </footer>
  );
}

export default Rodape;
