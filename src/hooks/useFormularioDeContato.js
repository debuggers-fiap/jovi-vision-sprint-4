// Hook customizado: a logica do formulario de contato da Landing Page.
//
// Guarda o que foi digitado, valida os campos e monta a mensagem de
// resposta. O componente Contato so desenha os campos e mostra o que este
// hook devolve - nenhuma regra de validacao fica na parte visual.

import { useState } from "react";

const formularioVazio = {
  nome: "",
  email: "",
  assunto: "Quero saber mais sobre a solucao",
  mensagem: "",
};

export function useFormularioDeContato() {
  const [campos, setCampos] = useState(formularioVazio);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Uma funcao so para todos os campos: ela descobre qual mudou pelo name.
  function mudarCampo(evento) {
    const { name, value } = evento.target;
    setCampos((anterior) => ({ ...anterior, [name]: value }));
    setErro("");
    setEnviado(false);
  }

  function validar() {
    if (campos.nome.trim().length < 2) {
      return "Escreva o seu nome.";
    }
    // Um e-mail valido precisa ter arroba e um ponto depois dela.
    const posicaoDoArroba = campos.email.indexOf("@");
    const temPontoDepois = campos.email.indexOf(".", posicaoDoArroba) > posicaoDoArroba;
    if (posicaoDoArroba < 1 || !temPontoDepois) {
      return "Escreva um e-mail valido.";
    }
    if (campos.mensagem.trim().length < 10) {
      return "A mensagem precisa ter pelo menos 10 letras.";
    }
    return "";
  }

  function enviar(evento) {
    evento.preventDefault();

    const problema = validar();
    if (problema) {
      setErro(problema);
      setEnviado(false);
      return;
    }

    // Este e um projeto academico e nao existe um servidor de e-mail para
    // receber a mensagem. Em vez de fingir que enviou, a tela confirma o
    // recebimento e mostra o endereco real da equipe.
    setErro("");
    setEnviado(true);
    setCampos(formularioVazio);
  }

  return { campos, erro, enviado, mudarCampo, enviar };
}
