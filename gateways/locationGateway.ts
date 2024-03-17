"use client";
import axios from "axios";
// const baseUrl = "https://nominatim.openstreetmap.org";
const baseUrl = "https://us1.locationiq.com";
const apiKey = process.env.NEXT_PUBLIC_GEOLOCATION_KEY; // Replace 'YOUR_API_KEY' with your LocationIQ API key
export type suggestionType = {
  display_name: string;
  lat: number;
  lon: number;
};

{
  // export async function getCityNameFromCoords({
  //   latitude,
  //   longitude,
  // }: {
  //   latitude: number;
  //   longitude: number;
  // }) {
  //   const queryparams = queryString.stringify({
  //     lon: longitude,
  //     lat: latitude,
  //   });
  //   const url = `${baseUrl}/reverse?${queryparams}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     // Extract the city name from the response
  //     console.log(
  //       `%c getCityNameFromCoords `,
  //       "color: white;border:3px solid white;margin:5px",
  //       data
  //     );
  //     const city = data.address.city;
  //     return city;
  //   } catch (error) {
  //     console.error("Error fetching city name:", error);
  //     return null;
  //   }
  // }
  // export async function getLocationSuggestions(query: string) {
  //   const queryparams = queryString.stringify({
  //     limit: 10,
  //     countrycodes: "IN",
  //     format: "json",
  //     q: query,
  //   });
  //   console.log("queryparams", queryparams);
  //   const url = `${baseUrl}//search?${queryparams}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.clear();
  //     console.log("getLocationSuggestions", data);
  //     // Extract location suggestions from the response
  //     const suggestions = data.map((item: any) => ({
  //       display_name: item.display_name,
  //       lat: item.lat,
  //       lon: item.lon,
  //     }));
  //     return suggestions;
  //   } catch (error) {
  //     console.error("Error fetching location suggestions:", error);
  //     return null;
  //   }
  // }
}

// LocationIQ API

export async function getLocationSuggestions(query: string) {
  const url = `${baseUrl}/v1/search.php`;

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        q: query,
        format: "json",
      },
    });

    // Extract location suggestions from the response
    const suggestions = response.data.map((item: suggestionType) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
    }));
    return suggestions;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
}
export async function getCityNameFromCoords({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const url = `${baseUrl}/v1/reverse.php`;

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
        lat: latitude,
        lon: longitude,
        format: "json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

// getLocationSuggestions("bareil");
// getCityNameFromCoords({ latitude: 28.3427957, longitude: 79.4155175 });
