"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/store";
import { getCityNameFromCoords } from "@/gateways/locationGateway";
import Navbar from "./Navbar";
import Map from "./MapComponent";
import Footer from "./Footer";

const Authenticate = ({ children }: { children: React.ReactNode }) => {
  const { getAuthStatus, user, isLoading } = useAuthStore();
  console.log(`%cuser `, "color: red;border:2px dotted red", user);
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
      <Footer />
    </div>
  );
};

export default Authenticate;
