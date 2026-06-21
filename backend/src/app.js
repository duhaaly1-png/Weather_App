import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: config.appName, timestamp: new Date().toISOString() });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/weather-requests", requestRoutes);
app.use("/api/export", exportRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
