// Componente filho: o visor da camera.
// E reaproveitado pelas telas de Foto, Estudo, Lousa e Digitalizar.
// Recebe o tipo de cena, a etiqueta que aparece em cima e o botao
// de captura, que vem de dentro da tela que usou o visor.

function Visor({ tipo, etiqueta, ocupado, compacto, frontal, clarao, children }) {
  // Monta a lista de classes conforme o estado do visor.
  let classes = "visor visor-" + tipo;
  if (compacto) {
    classes = classes + " visor-compacto";
  }
  if (frontal) {
    classes = classes + " visor-frontal";
  }

  return (
    <div className={classes}>
      {tipo === "livro" && (
        <div className="pagina">
          <p className="pagina-titulo">FOTOSSINTESE</p>
          <p className="pagina-linha">converte luz solar em</p>
          <p className="pagina-linha">energia quimica.</p>
          <p className="pagina-linha">Prova na sexta-feira.</p>
        </div>
      )}

      {tipo === "lousa" && (
        <div className="quadro">
          <p className="quadro-titulo">Equacao do 2o grau</p>
          <p className="quadro-linha">x = (-b +- V delta) / 2a</p>
          <p className="quadro-linha">delta = b2 - 4ac</p>
        </div>
      )}

      {tipo === "documento" && (
        <div className="folha">
          <span className="linha"></span>
          <span className="linha"></span>
          <span className="linha curta"></span>
          <span className="linha"></span>
          <span className="linha curta"></span>
        </div>
      )}

      <span className="brilho"></span>

      <span className="canto canto-1"></span>
      <span className="canto canto-2"></span>
      <span className="canto canto-3"></span>
      <span className="canto canto-4"></span>

      {etiqueta && (
        <p className={ocupado ? "selo selo-piscando" : "selo"}>
          <span className="selo-ponto"></span>
          {etiqueta}
        </p>
      )}

      {/* O clarao branco que pisca quando a foto e tirada */}
      {clarao && <span className="clarao"></span>}

      <div className="visor-rodape">{children}</div>
    </div>
  );
}

export default Visor;
