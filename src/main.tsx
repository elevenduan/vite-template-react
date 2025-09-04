import "./main.css";
import { createRoot } from "react-dom/client";
import { createHashRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import routes from "@/routes";

createRoot(document.getElementById("app")!).render(<RouterProvider router={createHashRouter(routes)} />);
