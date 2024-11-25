// 支持Mock.js语法规范 http://mockjs.com/examples.html

const gen = (
  url: string,
  method: string,
  data: any,
  code = "0000",
  message = "mock success"
) => ({ url, method, timeout: 1000, response: { data, code, message } });

export default [
  gen("/api/login", "get", {
    id: "@id",
    name: "@name",
    "status|1": ["available", "pending", "sold"],
    email: "@email",
    date: "@now(yyyy/MM/dd)",
    "list|1-10": [
      {
        "name|+1": ["Hello", "Mock.js", "!"]
      }
    ],
    imageUrl: "@image('200x100', '#894FC4', '#FFF', 'png', '')"
  }),
  gen("/api/account", "post", {
    id: "10",
    status: "approved",
    shipDate: "2024",
    complete: false,
    list: [
      [
        "et exercitation ut esse mollit",
        "nostrud",
        "amet ipsum aute ex tempor"
      ],
      ["proident", "dolor occaecat", "eu in nulla"]
    ],
    uuid: "guid",
    city: "city",
    url: "url"
  })
];
