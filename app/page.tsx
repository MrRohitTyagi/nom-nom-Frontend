"use client";
import Image from "next/image";
import homebackgroundimage from "@/assets/food-bg.jpg";
import GmapAutoComplete from "@/components/GmapAutoComplete";
import { motion } from "framer-motion";
import { BannerImageVarient, headingVarient } from "./varients";
import { suggestionType } from "@/gateways/locationGateway";
import { useAuthStore } from "@/utils/store";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import PopularCitiesPage from "@/components/PopularCitiesPage";

export default function Home() {
  const { dynamicUserUpdate, user } = useAuthStore();

  const handlelocationSelect = (location: suggestionType) => {
    dynamicUserUpdate({ address: location });
  };

  return (
    <div className="banner-box flex items-center flex-col w-full text-center space-y-5">
      <motion.div
        variants={BannerImageVarient}
        initial="initial"
        animate="animate"
        className="relative"
      >
        <Image
          className=" w-screen min-h-[40vh] object-cover"
          src={homebackgroundimage}
          alt="food bacgfround"
        />{" "}
        <div className="text-white space-y-3 main-heading absolute top-2/3 left-1/2 transform translate-x-[-50%] translate-y-[-50%] text-center">
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
          <div className="text-black flex flex-col gap-4 w-full max-w-sm items-center space-y-2 search-bar justify-center">
            <GmapAutoComplete
              onSave={handlelocationSelect}
              alreadyHaveAddress={!!user?.address?.display_name}
              title={user?.address?.display_name}
            />
          </div>
        </div>
      </motion.div>

      <PopularCitiesPage />
      <Footer />
    </div>
  );
}
