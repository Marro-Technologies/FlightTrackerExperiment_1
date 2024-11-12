import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFycm90ZWNoMjAyNCIsImEiOiJjbTM4ejVwYXkwdWp1MnFwb2ZjNWJjdzBuIn0.Yar-RbVn2TjYoW6FXytbEg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9", // Satellite view
      center: [-83.9882, 33.9562], // Coordinates for Lawrenceville, GA
      zoom: 12, // Zoom level for city view
      projection: "globe", // 3D globe projection
    });

    mapRef.current.on("style.load", () => {
      mapRef.current.setFog({}); // Add atmospheric fog for a realistic effect
    });

    mapRef.current.on("style.load", () => {
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    });

    // Clean up on unmount
    return () => mapRef.current.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />
  );
};

export default MapboxExample;
