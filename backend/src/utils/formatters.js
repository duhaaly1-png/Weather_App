export function flattenRequest(record) {
  const current = record.weatherData?.current || {};
  return {
    id: record.id,
    query: record.query,
    location: record.normalizedName,
    latitude: record.latitude,
    longitude: record.longitude,
    startDate: record.startDate,
    endDate: record.endDate,
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    notes: record.notes || "",
    createdAt: record.createdAt
  };
}

export function toMarkdown(records) {
  const rows = records.map(flattenRequest);
  const header = "| ID | Location | Query | Date Range | Temp | Wind | Created |\n|---|---|---|---|---|---|---|";
  const body = rows
    .map((row) => `| ${row.id} | ${row.location} | ${row.query} | ${formatDate(row.startDate)} to ${formatDate(row.endDate)} | ${value(row.temperature)} C | ${value(row.windSpeed)} km/h | ${formatDate(row.createdAt)} |`)
    .join("\n");
  return `# Weather Request Export\n\n${header}\n${body || "| | | | | | | |"}\n`;
}

function value(input) {
  return input ?? "N/A";
}

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}
