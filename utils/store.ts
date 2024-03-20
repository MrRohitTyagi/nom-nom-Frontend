import { create } from "zustand";
import { deleteToken, getToken } from "./cookie";
import { updateUser, getUser } from "@/gateways/userGateway";

export interface userType {
  _id?: string;
  email: string;
  name: string;
  password: string;
  isDarkTheme?: boolean;
  createdAT?: string;
  shop?: string | shopInterface;
  sub?: string;
  picture?: string | undefined;
  address?: addressType;
  shop_name?: string;
  shop_desc?: string;
}
export interface shopType extends userType {
  shop_name: string;
  shop_desc: string;
}

export type addressType = {
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  display_name?: string;
  lat?: number;
  lon?: number;
};

type userStoreType = {
  user: userType;
  shop: shopInterface;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthStatus: (payload: userType) => void;
  getAuthStatus: () => any;
  dynamicUserUpdate: (payload: any) => any;
  logout: () => void;
};

export const useStore = create<userStoreType>((setState) => ({
  user: {} as userType,
  shop: {} as shopInterface,
  isLoading: false,
  isAuthenticated: false,
  logout: () => {
    deleteToken();
    setState(() => ({
      isAuthenticated: false,
      user: {} as userType,
      isLoading: false,
    }));
  },
  setAuthStatus: (userPayload: userType) => {
    setState(() => ({
      user: userPayload,
      isAuthenticated: true,
      isLoading: false,
    }));
  },
  dynamicUserUpdate: (payload: any) => {
    setState((store: userStoreType) => {
      if (store?.user?._id) updateUser(payload);
      return {
        user: { ...store.user, ...payload },
      };
    });
  },
  getAuthStatus: async () => {
    let user;
    setState(() => ({ isLoading: true }));
    const token = getToken();
    if (!token) {
      user = {};
    } else {
      const { shop, ...userdata }: userType = await getUser();
      setState(() => ({
        isAuthenticated: true,
        user: userdata,
        ...(shop ? { shop: shop as shopInterface } : {}),
      }));
      user = userdata;
    }
    setState(() => ({ isLoading: false }));
    return user;
  },
}));

interface shopInterface {
  _id?: string;
  name?: string;
  desc?: string;
  picture?: string[];
  address?: addressType;
  isOpen?: boolean;
  timing?: { opensAt: string; closesAt: string };
  menu?: any; //TODO
  averageCTC?: string;
  phone?: string;
  tel?: string;
  offers?: { code: String; desc: string; discount: number }[];
}
