import { LocateFixed, Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function SearchForm({ form, setForm, onSubmit, onUseLocation, loading, geoLoading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
      <div>
        <label className="text-sm font-semibold text-slate-700" htmlFor="query">
          Location
        </label>
        <div className="mt-2 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              id="query"
              className="focus-ring w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3"
              placeholder="City, ZIP/postal code, GPS coordinates, landmark"
              value={form.query}
              onChange={(event) => setForm((current) => ({ ...current, query: event.target.value }))}
            />
          </div>
          <button
            type="button"
            onClick={onUseLocation}
            disabled={geoLoading || loading}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-pine px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LocateFixed size={18} />
            Current location
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Forecast is generated automatically for the next 5 days.</p>
        <button
          type="submit"
          disabled={loading}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-ocean px-5 py-3 font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <LoadingSpinner label="Searching" /> : <><Search size={18} /> Search weather</>}
        </button>
      </div>
    </form>
  );
}
