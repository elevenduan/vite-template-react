import { useRoutes } from "react-router-dom";
import { RouterTransition } from "@/components";
import routes from "@/routes";
import "./App.css";

function App() {
  return <RouterTransition>{useRoutes(routes)}</RouterTransition>;
}

export default App;
