// Componente filho: a mensagem curta que aparece na parte de baixo da
// tela para confirmar uma acao (foto salva, texto copiado, zoom trocado).
//
// Recebe por props o texto e o tipo. O tipo so muda a cor da borda e da
// letra: azul quando deu certo, rosa quando e informacao e laranja quando
// e para prestar atencao.

// A cor de cada tipo de aviso, em classes do Tailwind.
const coresPorTipo = {
  certo: "border-azul text-azul",
  info: "border-rosa text-rosa",
  atencao: "border-[#ffb454] text-[#ffb454]",
};

function Aviso({ texto, tipo }) {
  if (!texto) {
    return null;
  }

  const cor = coresPorTipo[tipo] || coresPorTipo.certo;

  return (
    <p
      role="status"
      className={
        "absolute right-4 bottom-[76px] left-4 z-10 rounded-[20px] border bg-[rgba(6,9,13,0.92)] px-3.5 py-[9px] text-center font-mono text-[11px] " +
        cor
      }
    >
      {texto}
    </p>
  );
}

export default Aviso;
