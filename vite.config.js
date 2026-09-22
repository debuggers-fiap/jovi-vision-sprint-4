import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// -------------------------------------------------------------------------
// A API do projeto durante o desenvolvimento
// -------------------------------------------------------------------------
//
// Em producao, quem responde /api/conteudos e /api/biblioteca e a Vercel,
// que executa sozinha os arquivos da pasta api/.
//
// Rodando na propria maquina com "npm run dev", nao existe Vercel. Este
// plugin resolve isso: ele usa os MESMOS arquivos da pasta api/ para
// responder aos mesmos enderecos.
//
// Assim o projeto funciona igual nos dois lugares, e quem for testar so
// precisa rodar "npm run dev" - nao ha um segundo servidor para ligar.
function apiDoJoviEmDesenvolvimento() {
  return {
    name: "api-do-jovi",
    configureServer(servidor) {
      servidor.middlewares.use(function (requisicao, resposta, seguir) {
        if (!requisicao.url.startsWith("/api/")) {
          return seguir();
        }

        // De /api/conteudos?x=1 sobra apenas "conteudos".
        const nomeDaRota = requisicao.url.split("?")[0].replace("/api/", "");

        // Junta o corpo da requisicao, que chega em pedacos.
        let corpoEmTexto = "";
        requisicao.on("data", function (pedaco) {
          corpoEmTexto = corpoEmTexto + pedaco;
        });

        requisicao.on("end", async function () {
          try {
            const modulo = await servidor.ssrLoadModule("/api/" + nomeDaRota + ".js");

            requisicao.body = corpoEmTexto ? JSON.parse(corpoEmTexto) : {};

            // A Vercel entrega para o handler uma resposta com .status() e
            // .json(). Aqui essas duas funcoes sao criadas na mao.
            resposta.status = function (codigo) {
              resposta.statusCode = codigo;
              return resposta;
            };
            resposta.json = function (dados) {
              resposta.setHeader("Content-Type", "application/json");
              resposta.end(JSON.stringify(dados));
            };

            modulo.default(requisicao, resposta);
          } catch (problema) {
            resposta.statusCode = 500;
            resposta.setHeader("Content-Type", "application/json");
            resposta.end(
              JSON.stringify({ ok: false, mensagem: String(problema.message) })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDoJoviEmDesenvolvimento()],
});
