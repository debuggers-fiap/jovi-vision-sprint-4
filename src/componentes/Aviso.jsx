// Componente filho: a mensagem curta que aparece na parte de baixo da
// tela para confirmar uma acao (foto salva, texto copiado, zoom trocado).
// E o mesmo aviso flutuante que o prototipo da Sprint 2 ja usava.
//
// Recebe do App o texto e o tipo, que so muda a cor da borda.

function Aviso({ texto, tipo }) {
  if (!texto) {
    return null;
  }

  return (
    <p className={"aviso-flutuante aviso-" + tipo} role="status">
      {texto}
    </p>
  );
}

export default Aviso;
