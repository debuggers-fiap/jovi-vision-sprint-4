// Hook customizado: a mensagem curta que aparece embaixo da tela.
//
// Serve para confirmar o que acabou de acontecer ("PDF guardado") ou para
// avisar de um problema. A mensagem some sozinha depois de 3,5 segundos.

import { useState, useEffect } from "react";

const avisoVazio = { texto: "", tipo: "certo" };

export function useAviso() {
  const [aviso, setAviso] = useState(avisoVazio);

  function mostrarAviso(texto, tipo) {
    setAviso({ texto: texto, tipo: tipo || "certo" });
  }

  useEffect(() => {
    if (!aviso.texto) {
      return;
    }

    const relogio = setTimeout(() => setAviso(avisoVazio), 3500);

    // Se outra mensagem chegar antes dos 3,5 segundos, o relogio antigo e
    // cancelado para nao apagar a mensagem nova.
    return () => clearTimeout(relogio);
  }, [aviso]);

  return { aviso, mostrarAviso };
}
