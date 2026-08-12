import { createRoot, type Root } from "react-dom/client";
import { HashRouter } from "react-router";
import { unstableSetRender } from "antd-mobile";
import Routes from "@/routes";
import "./main.css";

type RenderContainer = (Element | DocumentFragment) & { _reactRoot?: Root };

unstableSetRender((node, container: RenderContainer) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Routes />
  </HashRouter>
);
