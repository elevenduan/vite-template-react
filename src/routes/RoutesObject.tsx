// no match
import NoMatch from "@/pages/NoMatch";

// pages
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import About from "@/pages/About";

// routes
const RoutesObject = [
  {
    path: "/",
    children: [
      { index: true, element: <Home />, title: "首页" },
      { path: "login", element: <Login />, title: "登录" },
      { path: "about", element: <About />, title: "关于" },
      { path: "*", element: <NoMatch />, title: "未找到页面" }
    ]
  }
];
export default RoutesObject;
