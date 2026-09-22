// Rodape da Landing Page.

function RodapeLanding({ turma }) {
  return (
    <footer className="border-t border-borda bg-caixa">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="text-lg text-texto">
          JOVI <strong className="text-azul">Vision</strong>
        </p>

        <p className="mt-3 text-sm text-texto-fraco">
          Challenge FIAP 2026 em parceria com a JOVI Smartphone · Equipe Debuggers
          · Turma {turma}
        </p>

        <p className="mt-2 text-sm text-texto-fraco">
          Projeto academico desenvolvido para fins educacionais.
        </p>
      </div>
    </footer>
  );
}

export default RodapeLanding;
