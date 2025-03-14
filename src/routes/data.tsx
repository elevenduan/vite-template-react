// no match
import NoMatch from "@/pages/NoMatch";

// pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import About from "@/pages/About";

// routes
const data = [
  { index: true, element: <Home />, title: "首页" },
  { path: "login", element: <Login />, title: "登录" },
  { path: "about", element: <About />, title: "关于" },
  { path: "*", element: <NoMatch />, title: "未找到页面" }
];

export default data;
