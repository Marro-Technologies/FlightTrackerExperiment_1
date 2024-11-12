import React, { useEffect } from "react";
import axios from "axios";

const OpenSkyDataIngestion = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          "https://opensky-network.org/api/states/all",
          {
            auth: {
              username: "jbutler", // OpenSky username
              password: "MarroTech2024@", // OpenSky password
            },
          }
        );

        if (response.data && response.data.states) {
          // Process flight data to extract useful info
          const processedData = response.data.states.map((state) => ({
            id: state[0],
            callsign: state[1],
            country: state[2],
            longitude: state[5],
            latitude: state[6],
            altitude: state[7],
          }));
          onDataFetched(processedData);
        }
      } catch (error) {
        console.error("Error fetching OpenSky flight data:", error);
      }
    };

    fetchFlightData();

    // Refresh data every 10 seconds
    const interval = setInterval(fetchFlightData, 10000);
    return () => clearInterval(interval);
  }, [onDataFetched]);

  return null; // Nothing
};

export default OpenSkyDataIngestion;
