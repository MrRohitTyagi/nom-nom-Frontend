"use client";
import Image from "next/image";
import homebackgroundimage from "@/assets/home-background-image.jpg";
// import GoogLeAutoComplete from "@/components/GoogLeAutoComplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BannerImageVarient, headingVarient } from "./varients";

export default function Home() {
  return (
    <div className="banner-box flex items-center flex-col relative w-full text-center space-y-5">
      <motion.div
        variants={BannerImageVarient}
        initial="initial"
        animate="animate"
      >
        <Image
          className=" w-screen min-h-[40vh] object-cover"
          src={homebackgroundimage}
          alt="food bacgfround"
        />
      </motion.div>
      <div className="text-white space-y-3 main-heading absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-center">
        <motion.h1
          variants={headingVarient}
          initial="initial"
          animate="animate"
          className="text-4xl italic font-bold
          md:text-4xl lg:text-5xl xl:text-6xl text-nowrap"
        >
          NOM NOM
        </motion.h1>
        <motion.h2
          variants={headingVarient}
          initial="initial"
          animate="animate"
        >
          Find the best restaurants, cafés and bars in India
        </motion.h2>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 search-bar justify-center">
        {/* <GoogLeAutoComplete /> */}
        <Input type="email" placeholder="Search your location..." />
        <Button type="submit">Search</Button>
      </div>

      <h1 className="text-3xl">Popular locations in India</h1>
    </div>
  );
}
