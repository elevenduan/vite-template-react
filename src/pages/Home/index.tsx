import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { PageContent } from "../../components/PageContent";
import { Button, Form } from "antd-mobile";
import { ProNumber, ProInput } from "@bigflower/pro-mobile";
import { useRequest } from "ahooks";
import { apiUserAccount } from "../../services/api";

export default function Index() {
  const location = useLocation();
  const [form] = Form.useForm();
  const { runAsync, loading } = useRequest(apiUserAccount, { manual: true });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("home", location);
  }, [location.key]);

  useEffect(() => {
    runAsync({ id: "24" });
  }, []);

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
        <ProInput label="邮箱" name="email" required verify="email" />
      </Form>

      <Button size="large" color="primary" block onClick={() => navigate("/login")}>
        下一页
      </Button>
    </PageContent>
  );
}
