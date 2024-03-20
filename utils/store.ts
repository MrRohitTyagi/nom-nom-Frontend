import { create } from "zustand";
import { deleteToken, getToken } from "./cookie";
import { updateUser, getUser } from "@/gateways/userGateway";
import { updateShop } from "@/gateways/shopGateways";

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

type StoreType = {
  user: userType;
  shop: shopInterface;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthStatus: (payload: userType) => void;
  getAuthStatus: () => any;
  dynamicUserUpdate: (payload: any) => any;
  dynamicShopUpdate: (payload: any) => any;
  logout: () => void;
};

export const useStore = create<StoreType>((setState) => ({
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
  setAuthStatus: (response: userType) => {
    const { shop, ...userPayload } = response;
    setState(() => ({
      user: userPayload,
      isAuthenticated: true,
      isLoading: false,
      shop: shop as shopInterface,
    }));
  },
  dynamicUserUpdate: (payload: any) => {
    setState((store: StoreType) => {
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
        shop: (shop as shopInterface) || {},
      }));
      user = userdata;
    }
    setState(() => ({ isLoading: false }));
    return user;
  },

  // shop methods
  dynamicShopUpdate: (payload: any) => {
    setState((store: StoreType) => {
      if (store?.shop?._id) updateShop(payload, { shop_id: store.shop._id });
      return {
        shop: { ...store.shop, ...payload },
      };
    });
  },
}));

interface shopInterface {
  _id?: string;
  name?: string;
  desc?: string;
  picture?: string[];
  address?: addressType;
  regestrationStep?: number;
  isOpen?: boolean;
  timing?: { opensAt: string; closesAt: string };
  menu?: any; //TODO
  averageCTC?: string;
  phone?: string;
  tel?: string;
  offers?: { code: String; desc: string; discount: number }[];
}
