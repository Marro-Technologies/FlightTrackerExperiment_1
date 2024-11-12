import React, { useEffect, useState } from "react";

const DataIngestionComponent = ({ onDataFetched }) => {
  const [dataQueue, setDataQueue] = useState([]);

  // Placeholder parser functions for each data type
  const parseGNSS = (data) => {
    try {
      return JSON.parse(data); // Replace with GNSS-specific parsing logic
    } catch (e) {
      console.error("Error parsing GNSS data", e);
      return null; // Return null on error, this will be ignored later
    }
  };

  const parseSatellite = (data) => {
    try {
      return JSON.parse(data); // Replace with Satellite-specific parsing logic
    } catch (e) {
      console.error("Error parsing Satellite data", e);
      return null; // Return null on error, this will be ignored later
    }
  };

  const parseRadar = (data) => {
    try {
      return JSON.parse(data); // Replace with Radar-specific parsing logic
    } catch (e) {
      console.error("Error parsing Radar data", e);
      return null; // Return null on error, this will be ignored later
    }
  };

  const parseADS_B = (data) => {
    try {
      return JSON.parse(data); // Replace with ADS-B-specific parsing logic
    } catch (e) {
      console.error("Error parsing ADS-B data", e);
      return null; // Return null on error, this will be ignored later
    }
  };

  const parseInfrared = (data) => {
    try {
      return JSON.parse(data); // Replace with Infrared-specific parsing logic
    } catch (e) {
      console.error("Error parsing Infrared data", e);
      return null; // Return null on error, this will be ignored later
    }
  };

  useEffect(() => {
    // The WebSocket sources, potentially from some configuration or API later
    const sources = [
      { type: "gnss", parser: parseGNSS, url: "ws://real-gnss-source" },
      {
        type: "satellite",
        parser: parseSatellite,
        url: "ws://real-satellite-source",
      },
      { type: "radar", parser: parseRadar, url: "ws://real-radar-source" },
      { type: "ads-b", parser: parseADS_B, url: "ws://real-ads-b-source" },
      {
        type: "infrared",
        parser: parseInfrared,
        url: "ws://real-infrared-source",
      },
    ];

    sources.forEach((source) => {
      try {
        // Attempt to connect to the WebSocket
        const ws = new WebSocket(source.url);

        // Handle messages
        ws.onmessage = (event) => {
          try {
            const parsedData = source.parser(event.data);
            if (parsedData) {
              setDataQueue((prevQueue) => [
                ...prevQueue,
                { type: source.type, data: parsedData },
              ]);
            }
          } catch (e) {
            console.error(`Error processing data from ${source.type}:`, e);
          }
        };

        // Handle WebSocket errors
        ws.onerror = (error) => {
          console.error(`Error connecting to ${source.url}:`, error);
        };

        // Handle WebSocket closure
        ws.onclose = (e) => {
          console.warn(`WebSocket closed for ${source.url}:`, e);
        };
      } catch (e) {
        console.error(`Failed to initialize WebSocket for ${source.url}:`, e);
      }
    });

    // Cleanup on unmount
    return () => {
      // Close any WebSocket connections when the component is unmounted
      sources.forEach((source) => {
        // Ensure we have a WebSocket instance and close it properly
        if (source.ws) {
          source.ws.close();
        }
      });
    };
  }, []);

  // Forward the data to the parent component
  useEffect(() => {
    if (dataQueue.length > 0) {
      onDataFetched(dataQueue);
    }
  }, [dataQueue, onDataFetched]);

  return null; // This component does not render anything on its own
};

export default DataIngestionComponent;
