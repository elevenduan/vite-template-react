const gen = (
  url: string,
  method: string,
  data: any,
  code = "0000",
  message = "mock success"
) => ({ url, method, response: { data, code, message } });

export default [
  gen("/api/login", "get", {
    id: 5789444,
    name: "coco",
    status: "available"
  }),
  gen("/api/account", "post", {
    id: 10,
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
