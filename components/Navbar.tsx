"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/utils/store";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";
import { usePathname } from "next/navigation";
import useDimension from "@/hooks/useDimension";
import Image from "next/image";

import logo from "@/assets/logo.png";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const { isMobileView } = useDimension();
  console.log(isMobileView);

  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const showNavbar = ["/partner-with-us", "/signup", "/login", "/"].includes(
    pathname
  );

  if (!showNavbar) return null;

  const logoTag = (
    <Image width={100} height={100} src={logo} alt="logo" className="rounded" />
  );
  const restrauntRegester = isAuthenticated ? null : (
    <motion.button
      className="text-sm font-semibold leading-6 text-gray-900"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Link href="/partner-with-us">Regester your restraunt</Link>
    </motion.button>
  );

  const loginSignup = (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Link
        href="/login"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Log in
      </Link>
      {" / "}
      <Link
        href="/signup"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Sign up
      </Link>
    </motion.div>
  );

  return (
    <motion.header
      variants={varients}
      initial="initial"
      animate="animate"
      className="bg-white"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <span className="sr-only">Your Company</span>
          <Link href="/"> {!isOpen && logoTag}</Link>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => setisOpen(true)}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">{restrauntRegester}</div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? (
            <Button className="p-0 h-[1rem]" variant={"simple"}>
              <UserProfile />
            </Button>
          ) : (
            loginSignup
          )}
        </div>
      </nav>

      {isOpen && (
        <motion.div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="divide-y fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between px-6 py-3 ">
              <span className="sr-only">Your Company</span>
              {logoTag}

              <button
                onClick={() => setisOpen(false)}
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flow-root px-6 py-3 ">
              <div className=" divide-gray-500/10">
                <div className="space-y-2 py-3">{restrauntRegester}</div>
                <div className="py-3">{loginSignup}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const varients: Variants = {
  initial: { y: -100, borderBottom: "none" },
  animate: {
    y: 0,
    borderBottom: "1px solid rgba(209, 209, 209, 0.5)",
    transition: { duration: 0.5, type: "tween" },
  },
};

export default Navbar;
