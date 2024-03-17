import { create } from "zustand";
import { deleteToken, getToken } from "./cookie";
import { updateUser, getUser } from "@/gateways/userGateway";

export type userType = {
  _id?: string;
  email: string;
  name: string;
  password: string;
  isDarkTheme?: boolean;
  createdAT?: string;
  shop_id?: string;
  sub?: string;
  picture?: string | undefined;
  isOwner?: boolean;
  address?: addressType;
};
export type addressType = {
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  display_name?: string;
  lat?: number;
  lon?: number;
};

type storeType = {
  user: userType;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthStatus: (payload: userType) => void;
  getAuthStatus: () => any;
  dynamicUserUpdate: (payload: any) => any;
  logout: () => void;
};

export const useAuthStore = create<storeType>((set) => ({
  user: {} as userType,
  isLoading: false,
  isAuthenticated: false,
  logout: () => {
    deleteToken();
    set(() => ({
      isAuthenticated: false,
      user: {} as userType,
      isLoading: false,
    }));
  },
  setAuthStatus: (userPayload: userType) => {
    set(() => ({
      user: userPayload,
      isAuthenticated: true,
      isLoading: false,
    }));
  },
  dynamicUserUpdate: (payload: any) => {
    set((store: storeType) => {
      if (store?.user?._id) updateUser(payload);
      return {
        user: { ...store.user, ...payload },
      };
    });
  },
  getAuthStatus: async () => {
    let user;
    set(() => ({ isLoading: true }));
    const token = getToken();
    if (!token) {
      user = {};
    } else {
      const userdata: userType = await getUser();
      set(() => ({
        isAuthenticated: true,
        user: userdata,
      }));
      user = userdata;
    }
    set(() => ({ isLoading: false }));
    return user;
  },
}));
