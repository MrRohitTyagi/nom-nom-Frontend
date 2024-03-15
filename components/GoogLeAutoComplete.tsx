"use client";

import React from "react";
import Autocomplete from "react-google-autocomplete";
console.log("key", process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const GoogLeAutoComplete = () => {
  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      onPlaceSelected={(place) => console.log(place)}
    />
  );
};

export default GoogLeAutoComplete;
