"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store";
import { getCityNameFromCoords } from "@/gateways/locationGateway";
import Navbar from "./Navbar";
import Map from "./MapComponent";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, user, isAuthenticated, isLoading } = useAuthStore();

  const router = useRouter();

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
