import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 20000
});

export async function searchWeather(payload) {
  const { data } = await api.post("/weather/search", payload);
  return data;
}

export async function getHistory() {
  const { data } = await api.get("/weather-requests");
  return data;
}

export async function updateHistoryItem(id, payload) {
  const { data } = await api.put(`/weather-requests/${id}`, payload);
  return data;
}

export async function deleteHistoryItem(id) {
  await api.delete(`/weather-requests/${id}`);
}

export function exportUrl(format) {
  return `${api.defaults.baseURL}/export/${format}`;
}

export function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}
