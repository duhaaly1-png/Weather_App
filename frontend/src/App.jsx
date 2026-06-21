import { Route, Routes } from "react-router-dom";
import { CloudSun } from "lucide-react";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-mist text-ink">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ocean text-white">
              <CloudSun size={22} />
            </span>
            <span>Weather Dashboard</span>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
