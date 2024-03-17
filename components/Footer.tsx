import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="space-y-10 bg-slate-200 dark:bg-gray-900 w-screen py-10">
      <div
        className="1st-row flex flex-row gap-4 justify-center items-center 
       sm:space-x-6
       md:space-x-6
       xl:space-x-6
       "
      >
        <Link
          href="about"
          className="cursor-pointer text-xl opacity-80 text-indigo-900"
        >
          About
        </Link>
        <Link
          href="blog"
          className="cursor-pointer text-xl opacity-80 text-indigo-900"
        >
          Blog
        </Link>
        <Link
          href="jobs"
          className="cursor-pointer text-xl opacity-80 text-indigo-900"
        >
          Jobs
        </Link>
        <Link
          href="partners"
          className="cursor-pointer text-xl opacity-80 text-indigo-900"
        >
          Partners
        </Link>
      </div>
      <div className="2st-row space-x-4 flex flex-row gap-2 justify-center items-center">
        <motion.div
          variants={iconvarient}
          initial="initial"
          animate="animate"
          className="opacity-80 border-2 border-gray-300 p-2 rounded-xl"
        >
          <Facebook size={25} color="black" />
        </motion.div>

        <motion.div
          variants={iconvarient}
          initial="initial"
          animate="animate"
          className="opacity-80 border-2 border-gray-300 p-2 rounded-xl"
        >
          <Instagram size={25} color="black" />
        </motion.div>

        <motion.div
          variants={iconvarient}
          initial="initial"
          animate="animate"
          className="opacity-80 border-2 border-gray-300 p-2 rounded-xl"
        >
          <Twitter size={25} color="black" />
        </motion.div>

        <motion.div
          variants={iconvarient}
          initial="initial"
          animate="animate"
          className="opacity-80 border-2 border-gray-300 p-2 rounded-xl"
        >
          <Youtube size={25} color="black" />
        </motion.div>
      </div>
      <div className="3st-row flex flex-row gap-2 justify-center items-center">
        © 2020 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

const iconvarient = {
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, type: "tween" },
  },
  initial: { scale: 0, opacity: 0 },
};
export default Footer;
