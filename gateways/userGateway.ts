import axiosInstance from "@/utils/axiosinstance";
const baseURL = "/api/v1/user";

export async function getUser() {
  const { data } = await axiosInstance().get(`${baseURL}/get`);
  return data.user;
}

export async function updateUser(payload: any) {
  const { data } = await axiosInstance().put(`${baseURL}/update`, payload);
  return data.user;
}
