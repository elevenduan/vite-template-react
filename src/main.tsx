import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);