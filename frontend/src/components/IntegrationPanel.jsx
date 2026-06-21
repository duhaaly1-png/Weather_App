import { ExternalLink, Map } from "lucide-react";

export default function IntegrationPanel({ integrations }) {
  if (!integrations) return null;

  return (
    <section>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center justify-between gap-3 p-4">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Map className="text-ocean" />
            Google Maps
          </h2>
          <a className="flex items-center gap-1 text-sm font-semibold text-ocean" href={integrations.googleMaps?.mapsUrl} target="_blank" rel="noreferrer">
            Open <ExternalLink size={15} />
          </a>
        </div>
        <iframe
          title="Google map"
          src={integrations.googleMaps?.mapEmbedUrl}
          className="h-80 w-full border-0"
          loading="lazy"
        />
      </div>
    </section>
  );
}
