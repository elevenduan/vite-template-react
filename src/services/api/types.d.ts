// import type
declare namespace API {
  // login //
  type ReqUserLogin = {
    id: string;
    name: string;
  };
  type ResUserLogin = {
    id: string;
    name: string;
    status: "available" | "pending" | "sold";
    email: string;
    date: string;
    list: { name: string }[];
    imageUrl: string;
  };

  // account
  type ReqUserAccount = {
    id: string;
  };
  type ResUserAccount = {
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

// export
export = API;
export as namespace API;
