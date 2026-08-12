import { useRoutes } from "react-router";
import data from "./data";

export default function Index() {
  return useRoutes(data);
}
