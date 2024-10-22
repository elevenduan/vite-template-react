import styles from "./index.module.css";

type PropsType = {
  show?: boolean;
  text?: string;
};

export const PageLoading = (props: PropsType) => {
  const { show, text = "加载中..." } = props;

  return (
    <div className={`${styles.mask} ${show ? styles.show : ""}`}>
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
