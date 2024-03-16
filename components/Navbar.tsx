"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/utils/store";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const showNavbar = ["/partner-with-us", "/signup", "/login", "/"].includes(
    pathname
  );

  if (!showNavbar) return null;

  return (
    <motion.nav
      variants={varients}
      animate="animate"
      initial="initial"
      className="navbar w-screen fixed top-0 left-0 right-0 h-[3rem]
      px-10
     bg-gray-800 bg-opacity-50 flex flex-row items-center text-white z-[2]
     justify-between
     "
    >
      <Link href="/" className="underline text-2xl">
        Nom Nom
      </Link>
      <div className="flex flex-row gap-5">
        {!isAuthenticated && (
          <Link href="/partner-with-us">Restaurant regester</Link>
        )}
        {!isAuthenticated && <Link href="/login">Login</Link>}
        {!isAuthenticated && <Link href="/signup">SignUp</Link>}

        {isAuthenticated && (
          <Button variant={"simple"}>
            <UserProfile />
          </Button>
        )}
      </div>
    </motion.nav>
  );
};

const varients: Variants = {
  initial: { top: -100 },
  animate: { top: 0, transition: { duration: 0.5, type: "tween" } },
};

export default Navbar;
