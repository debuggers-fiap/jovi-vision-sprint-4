// Componente filho: a faixa que fica FORA do celular, em cima dele.
// Mostra quem entrou e o botao de sair, igual ao site da Sprint 2.
// Recebe do App o usuario logado e a funcao de sair.

import { saudacaoDoDia } from "../funcoes.js";

function BarraSuperior({ usuario, aoSair }) {
  // Pega so o primeiro nome, para a saudacao ficar curta.
  const primeiroNome = usuario.nome.split(" ")[0];

  // Quem entrou antes desta versao pode estar guardado no navegador
  // sem o RM. Nesse caso mostramos o e-mail no lugar.
  const identificacao = usuario.rm ? "RM " + usuario.rm : usuario.email;

  return (
    <div className="barra-superior">
      <p className="barra-superior-marca">
        <span className="barra-superior-ponto"></span>
        JOVI Vision
      </p>

      <div className="barra-superior-usuario">
        <p className="barra-superior-saudacao">
          <strong>
            {saudacaoDoDia()}, {primeiroNome}!
          </strong>{" "}
          {identificacao}
        </p>
        <button className="barra-superior-sair" onClick={aoSair} type="button">
          Sair
        </button>
      </div>
    </div>
  );
}

export default BarraSuperior;
