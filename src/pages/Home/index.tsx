import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { apiUserLogin, apiUserAccount } from "@/services/api";
import { useRequest } from "ahooks";
import { PageContent } from "@/components";

export default function Index() {
  const location = useLocation();
  const { runAsync, loading } = useRequest(apiUserAccount, { manual: true });

  useEffect(() => {
    apiUserLogin({ id: "24", name: "coco" });
    runAsync({ id: "24" });
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location.key]);

  return (
    <PageContent loading={loading}>
      <div>Home Home Home</div>
      <div>
        <Link to="/">To Home</Link>
      </div>
      <div>
        <Link to="/login">To Login</Link>
      </div>
      <div>
        <Link to="/about">To About</Link>
      </div>
      <div>
        <Link to="/nomatch">To No Match</Link>
      </div>
      <div>{loading ? "loading..." : "done"}</div>
    </PageContent>
  );
}
