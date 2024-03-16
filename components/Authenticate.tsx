"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store";
import { getCityName } from "@/gateways/locationGateway";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, user, isAuthenticated, isLoading } = useAuthStore();
  console.log(
    `%c  user, isAuthenticated, isLoading  `,
    "color: aqua;border:2px solid darkorange",
    { user, isAuthenticated, isLoading }
  );

  const router = useRouter();

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((data) => {
      console.log(data);
      getCityName(data.coords);
    });
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getAuthStatus();
        if (!user?._id) router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [getAuthStatus, router]);

  return isLoading ? <h1>Loading ...</h1> : <div>{children}</div>;
};

export default Authenticate;
