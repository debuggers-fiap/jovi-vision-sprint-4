// Tela de entrada do aplicativo, com as abas Entrar e Cadastrar.
// E a mesma tela que existia no site da Sprint 2, agora em React.
// Recebe do App a funcao que confirma o login.

import { useState } from "react";
import { IconeMarca } from "./Icones.jsx";
import { formatarNome } from "../funcoes.js";

// Lista de usuarios do aplicativo. Comeca com o usuario de teste que
// esta escrito no README; os cadastros novos entram nesta mesma lista.
const usuariosIniciais = [
  { nome: "Debugger Demo", rm: "000001", email: "demo@jovi.com", senha: "123456" },
];

// Confere se o texto tem cara de e-mail: alguma coisa, arroba,
// alguma coisa, ponto, alguma coisa.
function emailValido(texto) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto.trim());
}

// Confere se o texto tem apenas numeros.
function somenteNumeros(texto) {
  return /^\d+$/.test(texto.trim());
}

function TelaLogin({ aoEntrar }) {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [aba, setAba] = useState("entrar");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [novoNome, setNovoNome] = useState("");
  const [novoRm, setNovoRm] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function trocarAba(nova) {
    setAba(nova);
    setErro("");
    setSucesso("");
  }

  function entrar(evento) {
    evento.preventDefault();
    setSucesso("");

    if (!email.trim()) {
      setErro("Informe seu e-mail.");
      return;
    }
    if (!emailValido(email)) {
      setErro("E-mail invalido.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const encontrado = usuarios.find(function (u) {
      return u.email === email.trim() && u.senha === senha;
    });

    if (!encontrado) {
      setErro("E-mail ou senha incorretos. Confira os dados de teste abaixo.");
      return;
    }

    setErro("");
    aoEntrar({ nome: encontrado.nome, rm: encontrado.rm, email: encontrado.email });
  }

  function cadastrar(evento) {
    evento.preventDefault();
    setSucesso("");

    if (novoNome.trim().length < 3) {
      setErro("O nome deve ter pelo menos 3 caracteres.");
      return;
    }
    if (!somenteNumeros(novoRm)) {
      setErro("O RM deve conter apenas numeros.");
      return;
    }
    if (!emailValido(novoEmail)) {
      setErro("E-mail invalido.");
      return;
    }
    const jaExiste = usuarios.find(function (u) {
      return u.email === novoEmail.trim();
    });
    if (jaExiste) {
      setErro("Este e-mail ja esta cadastrado.");
      return;
    }
    if (novaSenha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const novo = {
      nome: formatarNome(novoNome),
      rm: novoRm.trim(),
      email: novoEmail.trim(),
      senha: novaSenha,
    };

    setUsuarios([...usuarios, novo]);
    setErro("");
    setSucesso("Conta de " + novo.nome + " criada. Agora e so entrar.");

    // Ja deixa o e-mail preenchido na aba de entrar, para facilitar.
    setEmail(novo.email);
    setSenha("");
    setNovoNome("");
    setNovoRm("");
    setNovoEmail("");
    setNovaSenha("");
    setAba("entrar");
  }

  return (
    <div className="login">
      <div className="marca-login">
        <span className="marca-selo">
          <IconeMarca />
        </span>
        <p className="marca-nome">
          JOVI <strong>VISION</strong>
        </p>
      </div>

      <h1 className="login-titulo">Camera assistiva para estudar</h1>
      <p className="login-frase">
        Entre para usar o Modo Estudo, o Scanner de Lousa e a digitalizacao de
        documentos.
      </p>

      <div className="abas">
        <button
          className={aba === "entrar" ? "aba aba-ativa" : "aba"}
          onClick={() => trocarAba("entrar")}
          type="button"
        >
          Entrar
        </button>
        <button
          className={aba === "cadastrar" ? "aba aba-ativa" : "aba"}
          onClick={() => trocarAba("cadastrar")}
          type="button"
        >
          Cadastrar
        </button>
      </div>

      {aba === "entrar" && (
        <form className="login-formulario" onSubmit={entrar}>
          <label className="rotulo" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            className="campo"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="demo@jovi.com"
          />

          <label className="rotulo" htmlFor="senha">
            Senha
          </label>
          <input
            id="senha"
            className="campo"
            type="password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
            placeholder="123456"
          />

          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">{sucesso}</p>}

          <button className="botao" type="submit">
            Entrar no JOVI Vision
          </button>
        </form>
      )}

      {aba === "cadastrar" && (
        <form className="login-formulario" onSubmit={cadastrar}>
          <label className="rotulo" htmlFor="novo-nome">
            Nome completo
          </label>
          <input
            id="novo-nome"
            className="campo"
            type="text"
            value={novoNome}
            onChange={(evento) => setNovoNome(evento.target.value)}
            placeholder="Seu nome"
          />

          <label className="rotulo" htmlFor="novo-rm">
            RM (numero de matricula)
          </label>
          <input
            id="novo-rm"
            className="campo"
            type="text"
            maxLength="10"
            value={novoRm}
            onChange={(evento) => setNovoRm(evento.target.value)}
            placeholder="000000"
          />

          <label className="rotulo" htmlFor="novo-email">
            E-mail
          </label>
          <input
            id="novo-email"
            className="campo"
            type="email"
            value={novoEmail}
            onChange={(evento) => setNovoEmail(evento.target.value)}
            placeholder="voce@exemplo.com"
          />

          <label className="rotulo" htmlFor="nova-senha">
            Senha (minimo 6 caracteres)
          </label>
          <input
            id="nova-senha"
            className="campo"
            type="password"
            value={novaSenha}
            onChange={(evento) => setNovaSenha(evento.target.value)}
            placeholder="******"
          />

          {erro && <p className="erro">{erro}</p>}

          <button className="botao" type="submit">
            Criar conta
          </button>
        </form>
      )}

      <p className="login-dica">
        Dados de teste: <strong>demo@jovi.com</strong> / <strong>123456</strong>
      </p>
    </div>
  );
}

export default TelaLogin;
