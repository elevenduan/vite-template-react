import { defineMock } from "vite-plugin-mock-dev-server";

const gen = (url: string, method: "GET" | "POST", data: unknown) => ({
  url,
  method,
  delay: 1000,
  body: () => {
    const res = { data, code: "0000", message: "mock success" };
    return res;
  },
});

export default defineMock([
  gen("/api/login", "GET", {
    id: "9",
    name: "张三",
    email: "zhangsan@example.com",
    date: "2024-06-01",
  }),
  gen("/api/account", "POST", {
    id: "10",
    status: "approved",
    shipDate: "2024",
    complete: false,
    list: [],
  }),
]);
