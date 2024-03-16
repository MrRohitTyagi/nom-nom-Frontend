export async function getCityName({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract the city name from the response
    console.log(
      `%c data `,
      "color: white;border:3px solid white;margin:5px",
      data
    );
    const city = data.address.city;
    return city;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
}
