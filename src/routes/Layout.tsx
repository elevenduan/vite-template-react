import { useEffect } from "react";
import { useOutlet, useLocation, useNavigate, matchRoutes } from "react-router";
import { PageTransition } from "@/components";
import { initGlobalNavigate } from "@/utils";
import data from "./data";

export default function Index() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initGlobalNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    // 设置页面标题
    const matches = matchRoutes(data, location);
    const title = matches?.[matches.length - 1].route.handle?.title;
    if (title) {
      document.title = title;
    }
  }, [location]);

  return <PageTransition>{outlet}</PageTransition>;
}
