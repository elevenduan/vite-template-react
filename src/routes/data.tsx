import Layout from "./Layout";
import Wrapper from "./Wrapper";

// pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoMatch from "../pages/NoMatch";

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
