import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUserLogin, apiUserAccount } from "@/services/api";
import { useRequest } from "ahooks";
import { PageContent } from "@/components";

function Index() {
  const { runAsync, loading } = useRequest(apiUserAccount, { manual: true });

  useEffect(() => {
    apiUserLogin({ id: 24, name: "coco" });
    runAsync({ id: 24 });
  }, []);
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

export default Index;
