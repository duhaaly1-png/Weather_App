export async function getLocationIntegrations(location) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=11&output=embed`;
  const imageUrl = `https://source.unsplash.com/1200x700/?${encodeURIComponent(location.shortName || location.name)},city,landmark`;

  return { googleMaps: { mapsUrl, mapEmbedUrl }, imageUrl };
}
