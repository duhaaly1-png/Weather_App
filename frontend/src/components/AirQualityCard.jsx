import { Leaf } from "lucide-react";
import { aqiLabel } from "../utilsWeather.jsx";

export default function AirQualityCard({ air }) {
  const status = aqiLabel(air?.us_aqi);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Leaf className="text-pine" />
          Air quality
        </h2>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${status.color}`}>{status.text}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Item label="US AQI" value={air?.us_aqi} />
        <Item label="PM2.5" value={air?.pm2_5} />
        <Item label="PM10" value={air?.pm10} />
        <Item label="Ozone" value={air?.ozone} />
      </div>
    </section>
  );
}

function Item({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-slate-500">{label}</p>
      <p className="mt-1 font-bold">{value ?? "N/A"}</p>
    </div>
  );
}
