import { useEffect } from "react";
import { useLocation } from "react-router";
import { PageContent } from "@/components";

export default function Index() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location.key]);

  return (
    <PageContent>
      <div>About About About</div>
    </PageContent>
  );
}
