import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default function Index() {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  function generate(data: any) {
    const res = {
      code: "0000",
      message: "mock success",
      data,
    };
    return [200, res];
  }

  mock.onGet("/api/login").reply(() => {
    const data = {
      id: 5789444,
      name: "coco",
      status: "available",
    };
    return generate(data);
  });

  mock.onPost("/api/account").reply(() => {
    const data = {
      id: 10,
      status: "approved",
      shipDate: "2024",
      complete: false,
      list: [
        [
          "et exercitation ut esse mollit",
          "nostrud",
          "amet ipsum aute ex tempor",
        ],
        ["proident", "dolor occaecat", "eu in nulla"],
      ],
      uuid: "guid",
      city: "city",
      url: "url",
    };
    return generate(data);
  });
}
