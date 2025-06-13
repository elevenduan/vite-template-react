import { PageContent, PopupConfirm, PopupCheckList } from "@/components";
import { useEffect, useState } from "react";
import { Form, CheckListItemProps } from "antd-mobile";
import { CheckListValue } from "antd-mobile/es/components/check-list";

export default function Index() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [searchText, setSearchText] = useState("");
  const originData: CheckListItemProps[] = [
    {
      value: "A",
      children: "AA",
    },
    {
      value: "B",
      children: "BB",
      description: "bbb",
    },
  ];
  const [data, setData] = useState(originData);

  function onConfirm(value: CheckListValue[], item: CheckListItemProps[]) {
    console.log(value, item);
  }

  useEffect(() => {
    setData(originData.filter((item) => item.children?.toString()?.includes(searchText)));
  }, [searchText]);

  return (
    <PageContent>
      <div onClick={() => setVisible1(true)}>PopupConfirm</div>
      <div onClick={() => setVisible2(true)}>PopupCheckList</div>
      <Form>
        <Form.Item label="check" name="input" trigger="onConfirm" onClick={(_, ref) => ref.current?.open()}>
          <PopupCheckList visible={visible3} setVisible={setVisible3} title="Title" data={data}>
            {(item) => <div>{item?.[0]?.value || "placeholder"}</div>}
          </PopupCheckList>
        </Form.Item>
      </Form>
      <PopupConfirm visible={visible1} setVisible={setVisible1} title="Title">
        <div>content</div>
      </PopupConfirm>
      <PopupCheckList
        visible={visible2}
        setVisible={setVisible2}
        title="Title"
        data={data}
        onConfirm={onConfirm}
        searchText={searchText}
        setSearchText={setSearchText}
      ></PopupCheckList>
    </PageContent>
  );
}
