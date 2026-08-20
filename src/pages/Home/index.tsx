import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { PageContent } from "@/components/PageContent";
import { Button, Form } from "antd-mobile";
import { ProNumber, ProInput, ProCheckList } from "@bigflower/pro-mobile";
import { useRequest } from "ahooks";
import { apiUserAccount } from "@/services/api";

export default function Index() {
  const location = useLocation();
  const [form] = Form.useForm();
  const { runAsync, loading } = useRequest(apiUserAccount, { manual: true });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("home", location);
  }, [location]);

  useEffect(() => {
    runAsync({ id: "24" });
  }, [runAsync]);

  return (
    <PageContent loading={loading}>
      <Form
        form={form}
        footer={
          <Button type="submit" size="large" color="primary" block>
            提交
          </Button>
        }
      >
        <ProNumber label="金额" name="money" required extra="元" />
        <ProInput label="邮箱" name="email" required verify="isEmail" />
        <ProCheckList
          label="爱好"
          name="hobby"
          required
          options={[
            { label: "阅读", value: "reading" },
            { label: "运动", value: "sports" },
            { label: "音乐", value: "music" },
          ]}
        />
      </Form>

      <Button size="large" color="primary" block onClick={() => navigate("/login")}>
        下一页
      </Button>
    </PageContent>
  );
}
