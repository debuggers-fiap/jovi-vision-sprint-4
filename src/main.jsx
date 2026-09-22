import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./estilos.css";

// O BrowserRouter e quem faz o navegador ter enderecos de verdade
// (/, /login, /app/estudo) em vez de uma pagina so.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
