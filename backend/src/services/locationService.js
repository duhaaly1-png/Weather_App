import axios from "axios";

const geocodeClient = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  timeout: 10000,
  headers: { "User-Agent": "weather-dashboard-client/1.0" }
});

export async function resolveLocation(query) {
  const gps = parseCoordinates(query);
  if (gps) {
    return reverseGeocode(gps.latitude, gps.longitude);
  }

  const { data } = await geocodeClient.get("/search", {
    params: { q: query, format: "jsonv2", limit: 1, addressdetails: 1 }
  });

  if (!data?.length) {
    const error = new Error("Location was not found. Try a city, ZIP/postal code, landmark, or GPS coordinates.");
    error.status = 404;
    throw error;
  }

  return normalizeLocation(data[0], query);
}

async function reverseGeocode(latitude, longitude) {
  const { data } = await geocodeClient.get("/reverse", {
    params: { lat: latitude, lon: longitude, format: "jsonv2", zoom: 10, addressdetails: 1 }
  });
  return normalizeLocation(data, `${latitude},${longitude}`);
}

function parseCoordinates(query) {
  const match = String(query).trim().match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
  if (!match) return null;
  const latitude = Number(match[1]);
  const longitude = Number(match[3]);
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

function normalizeLocation(place, fallback) {
  return {
    query: fallback,
    name: place.display_name || fallback,
    shortName: place.name || place.address?.city || place.address?.town || place.address?.state || fallback,
    latitude: Number(place.lat),
    longitude: Number(place.lon),
    country: place.address?.country || ""
  };
}
