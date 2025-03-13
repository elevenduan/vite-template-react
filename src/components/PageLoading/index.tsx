import { useEffect, useState } from "react";
import styles from "./index.module.css";

type PropsType = {
  show?: boolean;
  text?: string;
  duration?: number; // ms
};

export const PageLoading = (props: PropsType) => {
  const { show, text = "加载中...", duration = 400 } = props;
  const [fade, setFade] = useState<boolean>();

  useEffect(() => {
    setTimeout(() => setFade(show), !show && fade ? duration : 0);
  }, [show]);

  return (
    <div
      className={`${styles.mask} ${show || fade ? styles.block : ""} ${show && fade ? styles.show : ""}`}
      style={{ transitionDuration: duration + "ms" }}
    >
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div>
            <span className={`${styles.scale} ${styles.scale1}`}></span>
            <span className={`${styles.scale} ${styles.scale2}`}></span>
            <span className={`${styles.scale} ${styles.scale3}`}></span>
            <span className={`${styles.scale} ${styles.scale4}`}></span>
            <span className={`${styles.scale} ${styles.scale5}`}></span>
          </div>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};
