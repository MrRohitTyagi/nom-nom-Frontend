import { ArrowBigRightIcon, ArrowRight, Earth, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";
const stateCoordinates = [
  { name: "Uttar Pradesh", latitude: 27.1303344, longitude: 80.859666 },
  { name: "Maharashtra", latitude: 19.7514798, longitude: 75.7138884 },
  { name: "Bihar", latitude: 25.0960742, longitude: 85.3131194 },
  { name: "West Bengal", latitude: 22.9867569, longitude: 87.8549755 },
  { name: "Madhya Pradesh", latitude: 23.4733241, longitude: 77.9479988 },
  { name: "Tamil Nadu", latitude: 11.1271225, longitude: 78.6568942 },
  { name: "Rajasthan", latitude: 27.0238036, longitude: 74.2179326 },
  { name: "Karnataka", latitude: 15.3172775, longitude: 75.7138884 },
  { name: "Gujarat", latitude: 22.258652, longitude: 71.1923805 },
  { name: "Andhra Pradesh", latitude: 15.9128998, longitude: 79.7399875 },
  { name: "Odisha", latitude: 20.94092, longitude: 84.8034679 },
  { name: "Telangana", latitude: 18.1124, longitude: 79.0193 },
  { name: "Kerala", latitude: 10.8505163, longitude: 76.2710833 },
  { name: "Jharkhand", latitude: 23.6102, longitude: 85.2799 },
  { name: "Assam", latitude: 26.2006, longitude: 92.9376 },
];

const PopularCitiesPage = () => {
  return (
    <div className="space-y-2 w-full flex flex-col justify-center items-center py-8">
      <h1 className="text-3xl">Search popular restraunts in india</h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
       lg:grid-cols-4 xl:grid-cols-5 gap-6 grid-flow-row  py-10"
      >
        {stateCoordinates.map((state) => {
          return <Banner {...state} key={state.name} />;
        })}
      </div>
    </div>
  );
};

const Banner = ({ name }: { name: string }) => {
  return (
    <Link
      href={`/${name}`}
      className="country-box h-10 sm:w-50 md:w-50  border-2 
                 border-gray-400 flex flex-row
                 items-center justify-center shadow-md rounded-lg px-4 py-2
                 gap-2 cursor-pointer hover:shadow-lg"
    >
      {name}
      <ArrowRight color="black" size={18} />
    </Link>
  );
};

export default PopularCitiesPage;
