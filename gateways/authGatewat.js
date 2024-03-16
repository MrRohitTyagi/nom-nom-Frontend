import axiosinstance from "../utils/axiosinstance";
const baseURL = "/api/v1/user/";
import { setToken } from "@/utils/cookie";

export async function login(payload) {
  const { data } = await axiosinstance.post(`${baseURL}/login`, payload);
  setToken(data.token);
  console.log(`%c data `, "color: yellow;border:1px solid lightgreen", data);
  return data.user;
}
export async function signup(payload) {
  const { data } = await axiosinstance.post(`${baseURL}/signup`, payload);
  setToken(data.token);
  console.log(`%c data `, "color: yellow;border:1px solid lightgreen", data);
  return data.user;
}
export async function getUser(payload) {
  const { data } = await axiosinstance.get(`${baseURL}/get`, payload);
  console.log(`%c data `, "color: yellow;border:1px solid lightgreen", data);
  return data.user;
}
