"use client";

import React, { useEffect } from "react";
import { useAuthStore, useShopStore } from "@/utils/store";

import Navbar from "./Navbar";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, user, isLoading } = useAuthStore();
  const { getStoreData } = useShopStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        await getAuthStatus();
        getStoreData();
        // if (!user?._id && !isLoading) router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [getAuthStatus, getStoreData]);

  return isLoading ? (
    <>
      <h1>Loading ...</h1>
    </>
  ) : (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Authenticate;
