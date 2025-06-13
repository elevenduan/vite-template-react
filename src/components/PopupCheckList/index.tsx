import { ReactNode, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { CheckList, Toast, CheckListItemProps } from "antd-mobile";
import { CheckListValue } from "antd-mobile/es/components/check-list";
import { PopupConfirm, PropsPopupConfirm } from "@/components";

export type PropsPopupCheckList = Omit<PropsPopupConfirm, "onConfirm" | "children"> & {
  onConfirm?: (value: CheckListValue[], item: CheckListItemProps[]) => void;
  children?: (items: CheckListItemProps[]) => ReactNode;
  value?: string[];
  data: CheckListItemProps[];
  multiple?: boolean;
  required?: boolean;
};

export const PopupCheckList = forwardRef((props: PropsPopupCheckList, ref) => {
  const { onConfirm, visible, setVisible, data = [], value = [], multiple, children, required, ...rest } = props;
  const [checkValue, setCheckValue] = useState<CheckListValue[]>([]);
  const [checkItem, setCheckItem] = useState<CheckListItemProps[]>([]);
  const action = { open: () => setVisible(true) };

  useImperativeHandle(ref, () => action);

  function onConfirmInner() {
    if (!checkValue.length && required) {
      Toast.show("请选择");
      return false;
    }
    const item = data.filter((m) => checkValue.includes(m.value));
    setCheckItem(item);
    onConfirm?.(checkValue, item);
  }

  function onChange(val: CheckListValue[]) {
    setCheckValue(val);
  }

  function CKList() {
    return data.length ? (
      <CheckList multiple={multiple} onChange={onChange} value={checkValue}>
        {data.map((item) => (
          <CheckList.Item key={item.value} {...item} />
        ))}
      </CheckList>
    ) : null;
  }

  useEffect(() => {
    if (visible) {
      onChange(value);
    }
  }, [visible]);

  return (
    <>
      <PopupConfirm visible={visible} setVisible={setVisible} onConfirm={onConfirmInner} {...rest}>
        <CKList />
      </PopupConfirm>
      {children?.(checkItem)}
    </>
  );
});

export default PopupCheckList;
