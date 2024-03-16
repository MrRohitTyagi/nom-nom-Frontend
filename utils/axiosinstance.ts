"use client";
import axios from "axios";
import { getToken } from "@/utils/cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: { token: getToken() },
});
