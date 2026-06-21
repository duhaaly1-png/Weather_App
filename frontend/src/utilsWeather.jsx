import { Cloud, CloudRain, CloudSun, Snowflake, Sun, Zap } from "lucide-react";

export function weatherLabel(code) {
  if ([0].includes(code)) return "Clear sky";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if ([3, 45, 48].includes(code)) return "Cloudy or foggy";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Mixed conditions";
}

export function WeatherIcon({ code, className = "h-8 w-8" }) {
  if ([0].includes(code)) return <Sun className={className} />;
  if ([1, 2].includes(code)) return <CloudSun className={className} />;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className={className} />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Snowflake className={className} />;
  if ([95, 96, 99].includes(code)) return <Zap className={className} />;
  return <Cloud className={className} />;
}

export function aqiLabel(aqi) {
  if (aqi == null) return { text: "Unavailable", color: "bg-slate-100 text-slate-700" };
  if (aqi <= 50) return { text: "Good", color: "bg-emerald-100 text-emerald-800" };
  if (aqi <= 100) return { text: "Moderate", color: "bg-yellow-100 text-yellow-800" };
  if (aqi <= 150) return { text: "Unhealthy for sensitive groups", color: "bg-orange-100 text-orange-800" };
  return { text: "Unhealthy", color: "bg-red-100 text-red-800" };
}
