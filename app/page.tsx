"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  getCityNameFromCoords,
  suggestionType,
} from "@/gateways/locationGateway";
import { BannerImageVarient, headingVarient } from "./varients";
import { addressType, useAuthStore } from "@/utils/store";
import Footer from "@/components/Footer";
import homebackgroundimage from "@/assets/food-bg.jpg";
import PopularCitiesPage from "@/components/PopularCitiesPage";
import GmapAutoComplete from "@/components/GmapAutoComplete";
import { useCallback } from "react";

export default function Home() {
  const router = useRouter();
  const { dynamicUserUpdate, user } = useAuthStore();

  const handlelocationSelect = useCallback(
    async (location: suggestionType) => {
      const address = await getCityNameFromCoords({
        latitude: location.lat,
        longitude: location.lon,
      });
      const finalAddressObj: addressType = address.address;

      dynamicUserUpdate({ address: { ...finalAddressObj, ...location } });
      router.push(finalAddressObj?.state || "/");
    },
    [dynamicUserUpdate, router]
  );

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
