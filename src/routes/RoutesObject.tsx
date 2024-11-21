import { useOutlet } from "react-router-dom";
import { RouterTransition } from "@/components";

// no match
import NoMatch from "@/pages/NoMatch";

// pages
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import About from "@/pages/About";

// root
const Root = () => {
  const outlet = useOutlet();
  return <RouterTransition>{outlet}</RouterTransition>;
};

// routes
const RoutesObject = [
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home />, title: "首页" },
      { path: "login", element: <Login />, title: "登录" },
      { path: "about", element: <About />, title: "关于" },
      { path: "*", element: <NoMatch />, title: "未找到页面" }
    ]
  }
];
export default RoutesObject;
