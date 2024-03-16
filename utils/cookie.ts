import Cookie from "js-cookie";

export function getToken() {
  return Cookie.get("num-num-authToken");
}
export function setToken(token: string) {
  deleteToken();
  Cookie.set("num-num-authToken", token);
}
export function deleteToken() {
  Cookie.remove("num-num-authToken");
}
