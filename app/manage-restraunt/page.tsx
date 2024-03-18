"use client";

import { useShopStore } from "@/utils/store";
import React from "react";

const ManageRestraunt = () => {
  const { shop } = useShopStore();
  console.log(`%c shop `, "color: green;border:1px solid green", shop);
  return (
    <div className="bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-red-500 xl:bg-purple-500">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam,
      voluptate deleniti? Velit voluptatem atque obcaecati expedita consequuntur
      nesciunt voluptate aut excepturi temporibus fuga, non optio beatae debitis
      ab nulla voluptas?
    </div>
  );
};

export default ManageRestraunt;
