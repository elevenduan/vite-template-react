import { PageContent, PopupConfirm } from "@/components";
import { useState } from "react";

export default function Index() {
  const [visible, setVisible] = useState(false);

  return (
    <PageContent>
      <div onClick={() => setVisible(true)}>click</div>
      <PopupConfirm visible={visible} setVisible={setVisible} title="Title">
        <div>content</div>
      </PopupConfirm>
    </PageContent>
  );
}
