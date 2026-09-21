import { useEffect } from "react";
import { useLocation, useNavigate, matchRoutes } from "react-router";
import { initGlobalNavigate } from "@/utils";
import { PageKeep } from "@/components";
import data from "./data";

export default function Index() {
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
    console.log("layout:", location);
  }, [location]);

  return <PageKeep />;
}
