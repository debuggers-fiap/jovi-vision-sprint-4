// Cabecalho da Landing Page, com o menu de navegacao.
//
// No celular o menu comeca escondido e abre no botao de tres tracinhos.
// Na Sprint 3 isso era feito com um truque de checkbox no CSS; agora quem
// controla e o React, com useState.
//
// Recebe por props as secoes que viram links do menu.

import { useState } from "react";
import { Link } from "react-router-dom";

function CabecalhoLanding({ secoes }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-borda bg-fundo/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <a href="#inicio" className="flex items-center gap-2 text-lg text-texto">
          <span aria-hidden="true" className="text-rosa">
            ◎
          </span>
          JOVI <strong className="text-azul">Vision</strong>
        </a>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-borda md:hidden"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-expanded={menuAberto}
          aria-label={menuAberto ? "Fechar o menu" : "Abrir o menu"}
        >
          <span className="block h-0.5 w-5 bg-texto"></span>
          <span className="block h-0.5 w-5 bg-texto"></span>
          <span className="block h-0.5 w-5 bg-texto"></span>
        </button>

        <nav
          aria-label="Navegacao principal"
          className={
            menuAberto
              ? "order-last w-full md:order-none md:w-auto"
              : "order-last hidden w-full md:order-none md:block md:w-auto"
          }
        >
          <ul className="flex flex-col gap-1 py-2 md:flex-row md:items-center md:gap-6 md:py-0">
            {secoes.map((secao) => (
              <li key={secao.id}>
                <a
                  href={"#" + secao.id}
                  className="block rounded-lg px-2 py-2 text-texto-fraco transition-colors hover:text-azul md:px-0"
                  onClick={() => setMenuAberto(false)}
                >
                  {secao.nome}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="mt-2 block rounded-full bg-rosa px-5 py-2 text-center font-medium text-white transition-colors hover:bg-rosa-claro md:mt-0"
              >
                Entrar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default CabecalhoLanding;
