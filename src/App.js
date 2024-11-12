// src/App.js

import React, { useState } from "react";
import DataIngestionComponent from "./components/DataIngestionComponent";
import MapboxExample from "./components/MapboxExample";
import { fetchOpenSkyData } from "./utils/api";

function App() {
  const [fusedData, setFusedData] = useState(null);

  const handleApiPull = async () => {
    const apiData = await fetchOpenSkyData();

    // Process the data if needed before setting it
    if (apiData && apiData.states) {
      const processedData = apiData.states.map((state) => ({
        latitude: state[6],
        longitude: state[5],
        altitude: state[7],
        callsign: state[1],
        origin_country: state[2],
      }));
      setFusedData(processedData);
    }
  };

  return (
    <div>
      <h1>Real-Time Flight Tracking System</h1>
      <button onClick={handleApiPull}>Pull OpenSky Flight Data</button>
      <DataIngestionComponent onDataProcessed={setFusedData} />
      <MapboxExample fusedData={fusedData} />
    </div>
  );
}

export default App;
