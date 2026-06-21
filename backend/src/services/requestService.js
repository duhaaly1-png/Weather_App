import { resolveLocation } from "./locationService.js";
import { getAirQuality, getFiveDayForecast, getWeatherBundle } from "./weatherService.js";
import { getLocationIntegrations } from "./integrationService.js";
import { parseDateRange } from "../utils/dateRange.js";
import { createRecord, deleteRecord, findManyRecords, findUniqueRecord, updateRecord } from "./weatherRepository.js";

export async function createWeatherRequest({ query, startDate, endDate, notes }) {
  const location = await resolveLocation(query);
  const range = parseDateRange(startDate, endDate);
  const [weatherData, fiveDayForecast, airQualityData, integrations] = await Promise.all([
    getWeatherBundle(location, range),
    getFiveDayForecast(location),
    getAirQuality(location),
    getLocationIntegrations(location)
  ]);

  return createRecord({
    query,
    normalizedName: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    startDate: range.start,
    endDate: range.end,
    timezone: weatherData.timezone,
    weatherData: { ...weatherData, fiveDayForecast },
    airQualityData,
    integrations,
    notes
  });
}

export function listWeatherRequests() {
  return findManyRecords();
}

export async function getWeatherRequest(id) {
  const record = await findUniqueRecord(id);
  if (!record) {
    const error = new Error("Weather request not found.");
    error.status = 404;
    throw error;
  }
  return record;
}

export async function updateWeatherRequest(id, payload) {
  await getWeatherRequest(id);

  if (payload.query || payload.startDate || payload.endDate) {
    return createUpdatedWeatherRequest(id, payload);
  }

  return updateRecord(id, { notes: payload.notes });
}

export async function deleteWeatherRequest(id) {
  await getWeatherRequest(id);
  return deleteRecord(id);
}

async function createUpdatedWeatherRequest(id, payload) {
  const existing = await getWeatherRequest(id);
  const query = payload.query || existing.query;
  const startDate = payload.startDate || existing.startDate.toISOString().slice(0, 10);
  const endDate = payload.endDate || existing.endDate.toISOString().slice(0, 10);
  const refreshed = await createWeatherRequest({ query, startDate, endDate, notes: payload.notes ?? existing.notes });

  const updated = await updateRecord(id, {
    query: refreshed.query,
    normalizedName: refreshed.normalizedName,
    latitude: refreshed.latitude,
    longitude: refreshed.longitude,
    startDate: refreshed.startDate,
    endDate: refreshed.endDate,
    timezone: refreshed.timezone,
    weatherData: refreshed.weatherData,
    airQualityData: refreshed.airQualityData,
    integrations: refreshed.integrations,
    notes: refreshed.notes
  });
  await deleteRecord(refreshed.id).catch(() => {});
  return updated;
}
