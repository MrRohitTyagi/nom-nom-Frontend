"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/utils/store";
import { Button } from "./ui/button";
import UserProfile from "./UserProfile";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import logo from "@/assets/logo.png";
import { LogIn, LogOut, Store, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  const showNavbar = [
    "/partner-with-us",
    "/signup",
    "/login",
    "/",
    "/manage-restraunt",
  ].includes(pathname);

  if (!showNavbar) return null;

  const logoTag = (
    <Image width={120} height={120} src={logo} alt="logo" className="rounded" />
  );
  const restrauntRegester = isAuthenticated ? null : (
    <motion.button
      onClick={() => {
        setisOpen(false);
      }}
      className="text-1xl font-semibold leading-6 text-gray-900 flex flex-row gap-2 items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Store size={20} />{" "}
      <Link href="/partner-with-us">Regester your restraunt</Link>
    </motion.button>
  );

  const loginSignup = (
    <motion.div
      className="text-1xl flex flex-row gap-2 items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <LogIn size={20} />
      <Link
        onClick={() => {
          setisOpen(false);
        }}
        href="/login"
        className="font-semibold leading-6 text-gray-900"
      >
        Log in
      </Link>
      {" / "}
      <Link
        onClick={() => {
          setisOpen(false);
        }}
        href="/signup"
        className="font-semibold leading-6 text-gray-900"
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
        className="px-[1rem] flex  w-full items-center justify-between p-3 lg:px-8"
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
            <div className="flex items-center justify-between px-3 py-3 ">
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
              <div className="divide-gray-500/10 text-2xl">
                {!isAuthenticated && (
                  <div className="py-3">{restrauntRegester}</div>
                )}
                <div className="py-3 flex flex-col gap-2 divide-y">
                  {isAuthenticated ? (
                    <button
                      className="py-2"
                      onClick={() => router.push("/profile")}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <User size={24} />
                        <h1 className="text-2xl">Profile</h1>
                      </div>
                    </button>
                  ) : (
                    loginSignup
                  )}

                  {isAuthenticated && (
                    <button className="py-2" onClick={logout}>
                      <div className="flex flex-row gap-2 items-center">
                        <LogOut size={24} />
                        <h1 className="text-2xl">Logout</h1>
                      </div>
                    </button>
                  )}
                </div>
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
