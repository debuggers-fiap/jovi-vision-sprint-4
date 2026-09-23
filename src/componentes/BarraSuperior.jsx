// Componente filho: a faixa que fica FORA do celular, em cima dele.
// Mostra quem entrou e o botao de sair.
// Recebe por props o usuario logado e a funcao de sair.

import { saudacaoDoDia } from "../funcoes.js";

function BarraSuperior({ usuario, aoSair }) {
  // Pega so o primeiro nome, para a saudacao ficar curta.
  const primeiroNome = usuario.nome.split(" ")[0];

  // Quem entrou antes desta versao pode estar guardado no navegador
  // sem o RM. Nesse caso mostramos o e-mail no lugar.
  const identificacao = usuario.rm ? "RM " + usuario.rm : usuario.email;

  return (
    <div className="flex w-full max-w-96 items-center justify-between gap-3 border-b border-borda pb-3.5">
      <p className="flex items-center gap-2 text-[13px] font-bold tracking-wide">
        <span className="h-[7px] w-[7px] rounded-full bg-rosa shadow-[0_0_8px_var(--color-rosa)]"></span>
        JOVI Vision
      </p>

      <div className="flex items-center gap-3">
        <p className="text-xs text-texto-fraco">
          <strong className="text-texto">
            {saudacaoDoDia()}, {primeiroNome}!
          </strong>{" "}
          {identificacao}
        </p>

        <button
          type="button"
          onClick={aoSair}
          className="cursor-pointer rounded-[20px] border border-borda bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold text-texto-fraco transition-colors hover:bg-white/10 hover:text-texto"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default BarraSuperior;
