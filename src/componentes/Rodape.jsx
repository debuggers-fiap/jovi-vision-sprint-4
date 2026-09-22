// Componente filho: a faixa de baixo, embaixo do aparelho.
// Recebe do App a lista de integrantes e o nome da turma.

function Rodape({ integrantes, turma }) {
  return (
    <footer className="rodape">
      <p className="rodape-equipe">Equipe Debuggers - {turma}</p>
      <p className="rodape-nomes">
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
