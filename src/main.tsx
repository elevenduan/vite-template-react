import "./main.css";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router";
import routes from "@/routes";

createRoot(document.getElementById("app")!).render(
  <RouterProvider router={createHashRouter(routes)} />
);
