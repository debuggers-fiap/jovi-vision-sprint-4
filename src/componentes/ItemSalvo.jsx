// Componente neto: uma linha da lista de itens salvos na biblioteca.
// Recebe da tela o item e a funcao de remover.

function ItemSalvo({ item, aoRemover }) {
  return (
    <li className="item-salvo">
      <div>
        <p className="item-titulo">{item.titulo}</p>
        <p className="item-info">
          {item.codigo} - {item.data} - {item.confianca}% - {item.tamanho} KB
        </p>
      </div>
      <button className="botao-texto" onClick={() => aoRemover(item.codigo)}>
        Remover
      </button>
    </li>
  );
}

export default ItemSalvo;
