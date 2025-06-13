import { ReactNode, CSSProperties } from "react";
import { Button, Popup, SearchBar } from "antd-mobile";
import styles from "./index.module.css";

export type PropsPopupConfirm = {
  onCancel?: () => void | boolean;
  onConfirm?: () => void | boolean;
  cancelText?: string | ReactNode;
  confirmText?: string | ReactNode;
  title?: string | ReactNode;
  visible: boolean;
  setVisible: (val: boolean) => void;
  children?: ReactNode;
  bodyStyle?: CSSProperties;
  forceRender?: boolean;
  destroyOnClose?: boolean;
  searchText?: string;
  setSearchText?: (value: string) => void;
};

export const PopupConfirm = (props: PropsPopupConfirm) => {
  const {
    onCancel,
    onConfirm,
    cancelText = "取消",
    confirmText = "确定",
    title,
    visible,
    setVisible,
    children,
    bodyStyle,
    forceRender,
    destroyOnClose,
    searchText,
    setSearchText,
  } = props;

  function onCancelInner() {
    if (onCancel?.() !== false) {
      setVisible?.(false);
    }
  }

  function onConfirmInner() {
    if (onConfirm?.() !== false) {
      setVisible?.(false);
    }
  }

  return (
    <Popup
      visible={visible}
      onClose={onCancelInner}
      bodyStyle={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
      closeOnMaskClick
      forceRender={forceRender}
      destroyOnClose={destroyOnClose}
    >
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
        {setSearchText ? <SearchBar placeholder="请输入" style={{ marginTop: "1px" }} value={searchText} onChange={(v) => setSearchText(v)} /> : null}
        {children}
      </div>
    </Popup>
  );
};

export default PopupConfirm;
