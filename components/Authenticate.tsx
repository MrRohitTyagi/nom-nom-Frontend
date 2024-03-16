"use client";

import { getUser } from "@/gateways/authGatewat";
import { getToken } from "@/utils/cookie";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getAuthStatus();
        console.log(`%c user `, "color: pink;border:1px solid pink", user);
        if (!user?._id) router.push("/");
      } catch (error) {
        console.log(
          `%c error `,
          "color: burlywood;border:2px solid burlywood",
          error
        );
      }
    }
    fetchUser();
  }, [getAuthStatus]);

  return <div>{children}</div>;
};

export default Authenticate;
