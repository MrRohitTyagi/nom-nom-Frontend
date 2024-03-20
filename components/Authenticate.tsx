"use client";

import React, { useEffect } from "react";
import { useStore } from "@/utils/store";

import Navbar from "./Navbar";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, isLoading, shop, user } = useStore();
  console.log(
    `%c {user,shop} `,
    "color: white;border:3px solid white;margin:5px",
    { user, shop }
  );
  useEffect(() => {
    async function fetchUser() {
      try {
        await getAuthStatus();
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [getAuthStatus]);

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
