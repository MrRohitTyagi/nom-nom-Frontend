import axiosinstance from "@/utils/axiosinstance";
const baseURL = "/api/v1/user";

export async function getUser() {
  const { data } = await axiosinstance.get(`${baseURL}/get`);
  return data.user;
}

export async function updateUser(payload: any) {
  const { data } = await axiosinstance.put(`${baseURL}/update`, payload);
  return data.user;
}
