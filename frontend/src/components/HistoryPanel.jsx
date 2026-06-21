import { Download, RefreshCw, Save, Trash2 } from "lucide-react";
import { exportUrl } from "../services/api.js";

export default function HistoryPanel({ items, onRefresh, onDelete, onUpdate, loading }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Search history</h2>
          <p className="text-sm text-slate-500">Saved CRUD records from local JSON storage.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["json", "csv", "pdf", "markdown"].map((format) => (
            <a key={format} href={exportUrl(format)} className="focus-ring inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
              <Download size={15} />
              {format.toUpperCase()}
            </a>
          ))}
          <button onClick={onRefresh} className="focus-ring inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3">Location</th>
              <th className="px-3">Range</th>
              <th className="px-3">Temp</th>
              <th className="px-3">Notes</th>
              <th className="px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <HistoryRow key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
            {!items.length && (
              <tr>
                <td colSpan="5" className="rounded-lg bg-slate-50 px-3 py-8 text-center text-slate-500">
                  {loading ? "Loading history..." : "No saved weather searches yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HistoryRow({ item, onDelete, onUpdate }) {
  const temp = item.weatherData?.current?.temperature_2m;
  const start = new Date(item.startDate).toISOString().slice(0, 10);
  const end = new Date(item.endDate).toISOString().slice(0, 10);

  function saveNotes() {
    const notes = window.prompt("Update notes for this weather record:", item.notes || "");
    if (notes !== null) onUpdate(item.id, { notes });
  }

  return (
    <tr className="bg-slate-50">
      <td className="rounded-l-lg px-3 py-3">
        <p className="font-semibold">{item.normalizedName}</p>
        <p className="text-xs text-slate-500">{item.query}</p>
      </td>
      <td className="px-3 py-3">{start} to {end}</td>
      <td className="px-3 py-3 font-semibold">{temp ?? "N/A"} C</td>
      <td className="max-w-60 truncate px-3 py-3 text-slate-600">{item.notes || "-"}</td>
      <td className="rounded-r-lg px-3 py-3">
        <div className="flex justify-end gap-2">
          <button title="Update notes" onClick={saveNotes} className="focus-ring rounded-lg border border-slate-300 p-2 hover:bg-white">
            <Save size={16} />
          </button>
          <button title="Delete record" onClick={() => onDelete(item.id)} className="focus-ring rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
