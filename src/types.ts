import { Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";

export type RequestDetailsPropTypes = {
  RequestDetailID: number;
  RequestDetail?: RequestDetail;
  setCurrentRequestId?: Dispatch<SetStateAction<number>>;
  setLoggedIn?: Dispatch<SetStateAction<boolean>>;
};

export type RequestDetail = {
  ID: number;
  requester: Requester;
  town: string;
  title: string;
  description: string;
  peoplelimit: number;
  eventType: string;
};

export type Requester = {
  name: string;
  surname: string;
  address: string;
  qualifications: {
    university: string;
    areaofinterest: string;
  };
  phone: string;
};
