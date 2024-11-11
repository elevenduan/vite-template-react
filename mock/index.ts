import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default function Index() {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  const generate =
    (data: any, code = "0000", message = "mock success") =>
    () => [200, { data, code, message }];

  mock.onGet("/api/login").reply(
    generate({
      id: 5789444,
      name: "coco",
      status: "available"
    })
  );

  mock.onPost("/api/account").reply(
    generate({
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
  );
  /* END */
}
