import { FirstStepType } from "@/app/manage-restraunt/page";
import axiosInstance from "@/utils/axiosinstance";

const baseURL = "/api/v1/restraunt";

export async function updateShop(payload: FirstStepType, headers: any) {
  const { data } = await axiosInstance(headers).put(
    `${baseURL}/update`,
    payload
  );
  return data.user;
}
