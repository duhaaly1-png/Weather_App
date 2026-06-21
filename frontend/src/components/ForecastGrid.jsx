import { WeatherIcon, weatherLabel } from "../utilsWeather.jsx";

export default function ForecastGrid({ daily }) {
  const days = daily?.time || [];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold">5-day forecast</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {days.map((date, index) => (
          <article key={date} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-600">{new Date(date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</p>
            <div className="my-4 text-ocean">
              <WeatherIcon code={daily.weather_code[index]} />
            </div>
            <p className="text-sm text-slate-500">{weatherLabel(daily.weather_code[index])}</p>
            <p className="mt-3 text-xl font-bold">
              {Math.round(daily.temperature_2m_max[index])} / {Math.round(daily.temperature_2m_min[index])} C
            </p>
            <p className="mt-1 text-xs text-slate-500">Wind up to {daily.wind_speed_10m_max?.[index] ?? "N/A"} km/h</p>
          </article>
        ))}
      </div>
    </section>
  );
}
