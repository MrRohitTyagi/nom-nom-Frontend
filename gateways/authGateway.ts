import { shopType, userType } from "@/utils/store";
import axiosInstance from "../utils/axiosinstance";
const baseURL = "/api/v1/user";
import { setToken } from "@/utils/cookie";

export async function login(payload: { email: string; password: string }) {
  const { data } = await axiosInstance().post(`${baseURL}/login`, payload);
  setToken(data.token);
  return data.user;
}
export async function signup(payload: userType) {
  const { data } = await axiosInstance().post(`${baseURL}/signup`, payload);
  setToken(data.token);
  return data.user;
}
export async function regesterShop(payload: shopType) {
  const { data } = await axiosInstance().post(
    `${baseURL}/regester-restraunt`,
    payload
  );
  setToken(data.token);
  return { user: data.user, shop: data.shop };
}
