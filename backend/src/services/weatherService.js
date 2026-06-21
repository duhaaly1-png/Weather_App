import axios from "axios";

const weatherClient = axios.create({ baseURL: "https://api.open-meteo.com/v1", timeout: 12000 });
const airClient = axios.create({ baseURL: "https://air-quality-api.open-meteo.com/v1", timeout: 12000 });

export async function getWeatherBundle(location, range) {
  const { data } = await weatherClient.get("/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
      hourly: "temperature_2m,weather_code",
      timezone: "auto",
      start_date: range.startISO,
      end_date: range.endISO
    }
  });

  return {
    current: data.current,
    currentUnits: data.current_units,
    daily: data.daily,
    dailyUnits: data.daily_units,
    hourly: data.hourly,
    timezone: data.timezone
  };
}

export async function getFiveDayForecast(location) {
  const { data } = await weatherClient.get("/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max",
      timezone: "auto",
      forecast_days: 5
    }
  });
  return data.daily;
}

export async function getAirQuality(location) {
  try {
    const { data } = await airClient.get("/air-quality", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: "us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone",
        timezone: "auto"
      }
    });
    return data.current;
  } catch (_error) {
    return null;
  }
}
