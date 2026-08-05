import "./main.css";
import { createRoot } from "react-dom/client";
import { HashRouter, useRoutes } from "react-router";
import { unstableSetRender } from "antd-mobile";
import routes from "./routes";

unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

function App() {
  return useRoutes(routes);
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
