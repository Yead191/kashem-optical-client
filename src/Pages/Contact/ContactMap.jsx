
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ContactMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([latitude, longitude], 15);

    // Add the OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker at the specified location
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker
      .bindPopup("<b>Kashem Optical</b><br>Your trusted eyewear partner")
      .openPopup();

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return <div ref={mapRef} className="h-full w-full" />;
}

export default ContactMap;
