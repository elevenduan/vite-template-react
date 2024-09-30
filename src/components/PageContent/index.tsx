import { ReactNode, useEffect } from "react";
import styles from "./index.module.css";

type PropsType = {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export const PageContent = (props: PropsType) => {
  const { loading, className = "", children, header, footer } = props;

  useEffect(() => {
    // 使用项目引入的组件库中的loading
    // Toast.show
  }, [loading]);
  return (
    <div className={styles.page}>
      <div className={styles.top}>{header}</div>
      <div className={styles.mid}>
        <div className={`${styles["content"]} ${className}`}>{children}</div>;
      </div>
      <div className={styles.bot}>{footer}</div>
    </div>
  );
};
