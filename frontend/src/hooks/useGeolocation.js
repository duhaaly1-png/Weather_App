import { useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getCurrentPosition() {
    setError("");
    setLoading(true);

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const message = "Geolocation is not supported by this browser.";
        setError(message);
        setLoading(false);
        reject(new Error(message));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          const message = "Location permission was denied or unavailable.";
          setError(message);
          setLoading(false);
          reject(new Error(message));
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  return { getCurrentPosition, loading, error };
}
