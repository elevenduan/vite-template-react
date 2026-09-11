import { PageContent } from "@/components";
import noMatch from "@/assets/no-match.svg";
import styles from "./index.module.css";

export default function Index() {
  return (
    <PageContent>
      <div className={styles["no-match"]}>
        <img src={noMatch} />
        <div className={styles["main-text"]}>没有找到你需要的东西</div>
        <div className={styles["sub-text"]}>找找其他的吧</div>
      </div>
    </PageContent>
  );
}
