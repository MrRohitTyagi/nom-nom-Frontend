import { userType } from "@/utils/store";
import axiosinstance from "../utils/axiosinstance";
const baseURL = "/api/v1/user";
import { setToken } from "@/utils/cookie";

export async function login(payload: userType) {
  const { data } = await axiosinstance.post(`${baseURL}/login`, payload);
  setToken(data.token);
  return data.user;
}
export async function signup(payload: userType) {
  const { data } = await axiosinstance.post(`${baseURL}/signup`, payload);
  setToken(data.token);
  return data.user;
}
export async function getUser() {
  const { data } = await axiosinstance.get(`${baseURL}/get`);
  return data.user;
}
