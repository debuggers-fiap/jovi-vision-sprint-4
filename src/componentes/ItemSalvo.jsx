// Componente neto: uma linha da lista de itens salvos na biblioteca.
// Recebe por props o item e a funcao de remover.

function ItemSalvo({ item, aoRemover }) {
  return (
    <li className="flex items-center justify-between gap-2.5 rounded-xl border border-borda bg-caixa p-3">
      <div>
        <p className="text-sm font-medium">{item.titulo}</p>
        <p className="mt-[3px] font-mono text-[10px] text-texto-fraco">
          {item.codigo} - {item.data} - {item.confianca}% - {item.tamanho} KB
        </p>
      </div>

      <button
        type="button"
        className="cursor-pointer text-xs text-rosa"
        onClick={() => aoRemover(item.codigo)}
      >
        Remover
      </button>
    </li>
  );
}

export default ItemSalvo;
