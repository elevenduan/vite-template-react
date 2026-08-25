import type { RouteObject } from "react-router";
import Layout from "./Layout";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoMatch from "../pages/NoMatch";

// routes
const data: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home />, handle: { title: "首页" } },
      { path: "login", element: <Login />, handle: { title: "登录" } },
      { path: "*", element: <NoMatch />, handle: { title: "未找到页面" } },
    ],
  },
];

export default data;
