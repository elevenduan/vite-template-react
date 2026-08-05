import type { ReactNode } from "react";
import { useEffect } from "react";
import { useOutlet, useLocation, useNavigate } from "react-router";
import { initGlobalNavigate } from "../utils";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoMatch from "../pages/NoMatch";

// Layout
function Layout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initGlobalNavigate(navigate);
  }, []);

  useEffect(() => {
    // console.log("location", location);
  }, [location.key]);

  return outlet;
}

// Wrapper
function Wrapper({ element, title }: { element: ReactNode; title?: string }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return element;
}

// routes
const data = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Wrapper element={<Home />} title="首页" />,
      },
      {
        path: "login",
        element: <Wrapper element={<Login />} title="登录" />,
      },
      {
        path: "*",
        element: <Wrapper element={<NoMatch />} title="未找到页面" />,
      },
    ],
  },
];

export default data;
