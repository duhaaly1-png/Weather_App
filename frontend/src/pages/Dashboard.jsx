import { useEffect, useMemo, useState } from "react";
import AirQualityCard from "../components/AirQualityCard.jsx";
import Alert from "../components/Alert.jsx";
import CurrentWeather from "../components/CurrentWeather.jsx";
import ForecastGrid from "../components/ForecastGrid.jsx";
import HistoryPanel from "../components/HistoryPanel.jsx";
import IntegrationPanel from "../components/IntegrationPanel.jsx";
import SearchForm from "../components/SearchForm.jsx";
import { useGeolocation } from "../hooks/useGeolocation.js";
import { deleteHistoryItem, getErrorMessage, getHistory, searchWeather, updateHistoryItem } from "../services/api.js";

export default function Dashboard() {
  const [form, setForm] = useState({ query: "" });
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState("");
  const { getCurrentPosition, loading: geoLoading, error: geoError } = useGeolocation();

  useEffect(() => {
    refreshHistory();
  }, []);

  const forecast = useMemo(() => current?.weatherData?.fiveDayForecast, [current]);

  async function refreshHistory() {
    setHistoryLoading(true);
    try {
      setHistory(await getHistory());
    } catch (apiError) {
      setError(getErrorMessage(apiError));
    } finally {
      setHistoryLoading(false);
    }
  }

  async function submitSearch(event) {
    event?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const record = await searchWeather(form);
      setCurrent(record);
      await refreshHistory();
    } catch (apiError) {
      setError(getErrorMessage(apiError));
    } finally {
      setLoading(false);
    }
  }

  async function useCurrentLocation() {
    try {
      const position = await getCurrentPosition();
      const query = `${position.latitude.toFixed(5)},${position.longitude.toFixed(5)}`;
      const nextForm = { ...form, query };
      setForm(nextForm);
      setError("");
      setLoading(true);
      const record = await searchWeather(nextForm);
      setCurrent(record);
      await refreshHistory();
    } catch (apiError) {
      setError(getErrorMessage(apiError));
    } finally {
      setLoading(false);
    }
  }

  async function removeHistory(id) {
    setError("");
    try {
      await deleteHistoryItem(id);
      if (current?.id === id) setCurrent(null);
      await refreshHistory();
    } catch (apiError) {
      setError(getErrorMessage(apiError));
    }
  }

  async function updateHistory(id, payload) {
    setError("");
    try {
      const updated = await updateHistoryItem(id, payload);
      if (current?.id === id) setCurrent(updated);
      await refreshHistory();
    } catch (apiError) {
      setError(getErrorMessage(apiError));
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-normal sm:text-5xl">Duha Aly</h1>
          </div>
          <SearchForm
            form={form}
            setForm={setForm}
            onSubmit={submitSearch}
            onUseLocation={useCurrentLocation}
            loading={loading}
            geoLoading={geoLoading}
          />
          <Alert message={error || geoError} />
        </div>
        <CurrentWeather record={current} />
      </section>

      {current && (
        <>
          <div className="grid gap-4 lg:grid-cols-[1fr_0.42fr]">
            <ForecastGrid daily={forecast} />
            <AirQualityCard air={current.airQualityData} />
          </div>
          <IntegrationPanel integrations={current.integrations} />
        </>
      )}

      <HistoryPanel
        items={history}
        loading={historyLoading}
        onRefresh={refreshHistory}
        onDelete={removeHistory}
        onUpdate={updateHistory}
      />
    </main>
  );
}
