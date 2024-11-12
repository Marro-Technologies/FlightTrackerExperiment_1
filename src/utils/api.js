// src/utils/api.js

import axios from "axios";

export const fetchOpenSkyData = async () => {
  const url = "https://opensky-network.org/api/states/all";

  try {
    const response = await axios.get(url, {
      auth: {
        username: "jbutler", // Replace with OpenSky Network username if required
        password: "MarroTech2024@", // Replace with OpenSky Network password if required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching OpenSky data:", error);
    return null;
  }
};
