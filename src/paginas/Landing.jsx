// Pagina publica: a Landing Page do JOVI Vision.
// (em construcao - as secoes entram na proxima etapa)

import { Link } from "react-router-dom";

function Landing() {
  return (
    <main>
      <h1>JOVI Vision</h1>
      <Link to="/login">Entrar no aplicativo</Link>
    </main>
  );
}

export default Landing;
