import { ReactNode, CSSProperties } from "react";
import { Button, Popup } from "antd-mobile";
import styles from "./index.module.css";

export type PropsPopupConfirm = {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string | ReactNode;
  confirmText?: string | ReactNode;
  title?: string | ReactNode;
  visible: boolean;
  setVisible: (val: boolean) => void;
  children?: ReactNode;
  bodyStyle?: CSSProperties;
};

export const PopupConfirm = (props: PropsPopupConfirm) => {
  const { onCancel, onConfirm, cancelText = "取消", confirmText = "确定", title, visible, setVisible, children, bodyStyle } = props;

  function onCancelInner() {
    onCancel?.();
    setVisible?.(false);
  }

  function onConfirmInner() {
    onConfirm?.();
    setVisible?.(false);
  }

  return (
    <Popup visible={visible} onClose={onCancelInner} bodyStyle={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} closeOnMaskClick>
      <div className={styles.head}>
        <Button fill="none" size="small" color="primary" onClick={onCancelInner}>
          {cancelText}
        </Button>
        <div className={styles.title}>{title}</div>
        <Button fill="none" size="small" color="primary" onClick={onConfirmInner}>
          {confirmText}
        </Button>
      </div>
      <div className={styles.body} style={bodyStyle}>
        {children}
      </div>
    </Popup>
  );
};

export default PopupConfirm;
