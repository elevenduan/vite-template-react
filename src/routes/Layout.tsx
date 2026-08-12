import { useEffect } from "react";
import { useOutlet, useLocation, useNavigate } from "react-router";
import { PageTransition } from "@/components";
import { initGlobalNavigate } from "@/utils";

export default function Index() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initGlobalNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    // console.log("location", location);
  }, [location]);

  return <PageTransition>{outlet}</PageTransition>;
}
