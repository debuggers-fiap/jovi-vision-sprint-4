// Secao Contato: formulario e os outros canais da equipe.
//
// Grid Container de duas colunas no desktop. O proprio formulario e um
// segundo Grid Container, com campos que ocupam uma ou duas colunas.
//
// Toda a validacao fica no hook useFormularioDeContato. Aqui so tem o
// desenho dos campos.

import TopoDaSecao from "./TopoDaSecao.jsx";
import { useFormularioDeContato } from "../../hooks/useFormularioDeContato.js";

const assuntos = [
  "Quero saber mais sobre a solucao",
  "Sugestao de melhoria",
  "Acessibilidade e testes com usuarios",
  "Outro",
];

const estiloDoCampo =
  "w-full rounded-lg border border-borda bg-fundo px-4 py-3 text-texto placeholder:text-texto-fraco focus:border-azul focus:outline-none";

function Contato() {
  const { campos, erro, enviado, mudarCampo, enviar } = useFormularioDeContato();

  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16">
      <TopoDaSecao
        etiqueta="Contato"
        titulo="Fale com a equipe"
        linha="Duvidas sobre a solucao, sugestoes ou interesse no projeto? Escreva para a gente."
      />

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <form onSubmit={enviar} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="mb-2 block text-sm text-texto">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={campos.nome}
              onChange={mudarCampo}
              placeholder="Como podemos te chamar?"
              className={estiloDoCampo}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-texto">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={campos.email}
              onChange={mudarCampo}
              placeholder="voce@exemplo.com"
              className={estiloDoCampo}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="assunto" className="mb-2 block text-sm text-texto">
              Assunto
            </label>
            <select
              id="assunto"
              name="assunto"
              value={campos.assunto}
              onChange={mudarCampo}
              className={estiloDoCampo}
            >
              {assuntos.map((assunto) => (
                <option key={assunto}>{assunto}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="mensagem" className="mb-2 block text-sm text-texto">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="5"
              value={campos.mensagem}
              onChange={mudarCampo}
              placeholder="Escreva sua mensagem"
              className={estiloDoCampo}
            ></textarea>
          </div>

          {erro && (
            <p role="alert" className="text-sm text-rosa-claro md:col-span-2">
              {erro}
            </p>
          )}

          {enviado && (
            <p role="status" className="text-sm text-azul md:col-span-2">
              Mensagem registrada! Como este e um projeto academico, responda
              tambem por e-mail para a gente te achar: debuggers@fiap.com.br
            </p>
          )}

          <button
            type="submit"
            className="rounded-full bg-rosa px-6 py-3 font-medium text-white transition-colors hover:bg-rosa-claro md:col-span-2"
          >
            Enviar mensagem
          </button>
        </form>

        <aside className="rounded-2xl border border-borda bg-caixa p-6">
          <h3 className="text-lg font-bold text-texto">Outros canais</h3>

          <dl className="mt-4 grid gap-4 text-sm">
            <div>
              <dt className="text-texto-fraco">E-mail da equipe</dt>
              <dd>
                <a href="mailto:debuggers@fiap.com.br" className="text-azul hover:underline">
                  debuggers@fiap.com.br
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-texto-fraco">Repositorio</dt>
              <dd>
                <a
                  href="https://github.com/debuggers-fiap/jovi-vision-sprint-4"
                  className="text-azul hover:underline"
                >
                  github.com/debuggers-fiap/jovi-vision-sprint-4
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-texto-fraco">Instituicao</dt>
              <dd className="text-texto">FIAP · Engenharia de Software · 1ESPG-2026</dd>
            </div>

            <div>
              <dt className="text-texto-fraco">Parceria</dt>
              <dd>
                <a href="https://www.jovimobile.com/" className="text-azul hover:underline">
                  JOVI Smartphone
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default Contato;
