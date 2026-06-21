const developerName = import.meta.env.VITE_DEVELOPER_NAME || "Your Name";

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wide text-ocean">Weather Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal">Built by {developerName}</h1>
        <p className="mt-4 text-slate-600">
          A modern weather dashboard with free-form location search, current conditions, 5-day forecast, air quality data, local search history, and export options in JSON, CSV, PDF, and Markdown.
        </p>
        <div className="mt-6 rounded-lg bg-slate-50 p-5">
          <h2 className="font-bold">About this app</h2>
          <p className="mt-2 text-slate-600">
            This application uses Open-Meteo for weather and air quality data, OpenStreetMap for geocoding, and saved JSON storage for local history. The frontend is built with React, Vite, and Tailwind CSS.
          </p>
        </div>
      </section>
    </main>
  );
}
