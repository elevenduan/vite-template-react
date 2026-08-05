import { useEffect } from "react";
import { useLocation } from "react-router";
import { PageContent } from "../../components/PageContent";

export default function Index() {
  const location = useLocation();

  useEffect(() => {
    console.log("login", location);
  }, [location.key]);

  return (
    <PageContent>
      <div>Login Login Login Login Login Login</div>
    </PageContent>
  );
}
