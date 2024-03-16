import { create } from "zustand";
import { getToken } from "./cookie";
import { getUser } from "@/gateways/authGatewat";

type userType =
  | {
      _id: string;
      name: string;
      email: string;
      isDarkTheme: boolean;
      createdAT: string;
    }
  | {};

type storeType = {
  user: userType;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthStatus: (payload: userType) => void;
  getAuthStatus: () => any;
};

export const useAuthStore = create<storeType>((set) => ({
  user: {},
  isLoading: false,
  isAuthenticated: false,
  setAuthStatus: (userPayload: userType) => {
    set(() => ({
      user: userPayload,
      isAuthenticated: true,
      isLoading: false,
    }));
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
        user: userdata,
      }));
      user = userdata;
    }
    set(() => ({ isLoading: false }));
    return user;
  },
}));
