import { useEffect } from "react";
import { useOutlet, useMatches, useLocation, useNavigate } from "react-router";
import { PageTransition } from "@/components";
import { initGlobalNavigate } from "@/utils";

// no match
import NoMatch from "@/pages/NoMatch";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import About from "@/pages/About";

// Layout
function Layout() {
  const outlet = useOutlet();
  const matches = useMatches();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initGlobalNavigate(navigate);
  }, []);

  useEffect(() => {
    const handle: any = matches.at(-1)?.handle;

    // title
    if (handle?.title) {
      document.title = handle.title;
    }
  }, [location.key]);

  return <PageTransition>{outlet}</PageTransition>;
}

// routes
const data = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "首页" },
      },
      {
        path: "login",
        element: <Login />,
        handle: { title: "登录" },
      },
      {
        path: "about",
        element: <About />,
        handle: { title: "关于" },
      },
      {
        path: "*",
        element: <NoMatch />,
        handle: { title: "未找到页面" },
      },
    ],
  },
];

export default data;
