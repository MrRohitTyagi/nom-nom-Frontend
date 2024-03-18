"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store";
import Navbar from "./Navbar";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, user, isLoading } = useAuthStore();
  console.log(`%cuser `, "color: red;border:2px dotted red", user);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        await getAuthStatus();
        // if (!user?._id && !isLoading) router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [getAuthStatus]);

  return isLoading ? (
    <>
      <h1>Loading ...</h1>
      {/* <Map /> */}
    </>
  ) : (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Authenticate;
