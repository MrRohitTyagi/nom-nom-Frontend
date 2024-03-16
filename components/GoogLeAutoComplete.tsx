"use client";

import React from "react";
import Autocomplete from "react-google-autocomplete";

const GoogLeAutoComplete = () => {
  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      onPlaceSelected={(place) => console.log(place)}
    />
  );
};

export default GoogLeAutoComplete;
