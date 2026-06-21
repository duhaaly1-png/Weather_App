import { Droplets, MapPin, Navigation, Thermometer, Wind } from "lucide-react";
import { WeatherIcon, weatherLabel } from "../utilsWeather.jsx";

export default function CurrentWeather({ record }) {
  if (!record) return <EmptyWeather />;

  const current = record.weatherData?.current || {};
  const imageUrl = record.integrations?.imageUrl;

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-ocean">
                <MapPin size={17} />
                {record.normalizedName}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-normal sm:text-5xl">
                {Math.round(current.temperature_2m ?? 0)} C
              </h1>
              <p className="mt-2 text-lg text-slate-600">{weatherLabel(current.weather_code)}</p>
            </div>
            <div className="grid h-20 w-20 place-items-center rounded-lg bg-sun/20 text-amber-700">
              <WeatherIcon code={current.weather_code} className="h-11 w-11" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric icon={<Thermometer />} label="Feels like" value={`${current.apparent_temperature ?? "N/A"} C`} />
            <Metric icon={<Droplets />} label="Humidity" value={`${current.relative_humidity_2m ?? "N/A"}%`} />
            <Metric icon={<Wind />} label="Wind" value={`${current.wind_speed_10m ?? "N/A"} km/h`} />
            <Metric icon={<Navigation />} label="Direction" value={`${current.wind_direction_10m ?? "N/A"} deg`} />
          </div>
        </div>
        <div className="min-h-64 bg-slate-200">
          <img
            src={imageUrl}
            alt={record.normalizedName}
            className="h-full min-h-64 w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="h-5 w-5">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}

function EmptyWeather() {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <p className="text-lg font-semibold">Search for a location to start.</p>
      <p className="mt-2 text-slate-500">Try Cairo, 10001, Eiffel Tower, or coordinates like 30.0444,31.2357.</p>
    </section>
  );
}
