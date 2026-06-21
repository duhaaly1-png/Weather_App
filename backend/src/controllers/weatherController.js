import { createWeatherRequest } from "../services/requestService.js";

export async function searchWeather(req, res, next) {
  try {
    const record = await createWeatherRequest(req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
}
