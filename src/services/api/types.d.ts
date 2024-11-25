declare namespace API {
  // login
  export type ReqUserLogin = {
    id: string;
    name: string;
  };
  export type ResUserLogin = {
    id: string;
    name: string;
    status: "available" | "pending" | "sold";
    email: string;
    date: string;
    list: { name: string }[];
    imageUrl: string;
  };

  // account
  export type ReqUserAccount = {
    id: string;
  };
  export type ResUserAccount = {
    id: string;
    status?: "placed" | "approved" | "delivered";
    shipDate?: string;
    complete?: boolean;
    list?: string[][];
    uuid?: string;
    city?: string;
    url?: string;
  };
}
