declare namespace API {
  // login
  export type ReqUserLogin = {
    id: number;
    name: string;
  };
  export type ResUserLogin = {
    id: number;
    name: string;
    status?: "available" | "pending" | "sold";
  };

  // account
  export type ReqUserAccount = {
    id: number;
  };
  export type ResUserAccount = {
    id: number;
    status?: "placed" | "approved" | "delivered";
    shipDate?: string;
    complete?: boolean;
    list?: string[][];
    uuid?: string;
    city?: string;
    url?: string;
  };
}
