import "./main.css";
import { createRoot } from "react-dom/client";
import { HashRouter, useRoutes } from "react-router";
import routes from "@/routes";
import { RouterTransition } from "@/components";

function App() {
  return <RouterTransition>{useRoutes(routes)}</RouterTransition>;
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
