import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = ({ flightData }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markersRef = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFycm90ZWNoMjAyNCIsImEiOiJjbTM4ejVwYXkwdWp1MnFwb2ZjNWJjdzBuIn0.Yar-RbVn2TjYoW6FXytbEg";

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-83.9882, 33.9562], // Initial coordinates for Lawrenceville, GA
      zoom: 5,
      projection: "globe",
    });

    mapRef.current.on("style.load", () => {
      mapRef.current.setFog({});
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });

    return () => mapRef.current.remove();
  }, []);

  // Update markers whenever flightData changes
  useEffect(() => {
    if (!flightData || !mapRef.current) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers with airplane icon for each flight
    flightData.forEach((flight) => {
      if (flight.latitude && flight.longitude) {
        const el = document.createElement("div");
        el.className = "airplane-marker";
        el.style.backgroundImage = "url(/airplane.png)"; // Path to airplane icon in the public folder
        el.style.width = "30px";
        el.style.height = "30px";
        el.style.backgroundSize = "cover";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([flight.longitude, flight.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setText(
              `Flight: ${flight.callsign}\nCountry: ${flight.country}\nAltitude: ${flight.altitude}`
            )
          )
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      }
    });
  }, [flightData]);

  return (
    <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
  );
};

export default MapboxExample;
