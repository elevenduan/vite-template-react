import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes";
import "./main.css";

const router = createHashRouter(routes);

createRoot(document.getElementById("app")!).render(
  <RouterProvider router={router}></RouterProvider>
);
