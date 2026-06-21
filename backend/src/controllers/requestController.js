import {
  deleteWeatherRequest,
  getWeatherRequest,
  listWeatherRequests,
  updateWeatherRequest
} from "../services/requestService.js";

export async function index(_req, res, next) {
  try {
    res.json(await listWeatherRequests());
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    res.json(await getWeatherRequest(req.params.id));
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    res.json(await updateWeatherRequest(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
}

export async function destroy(req, res, next) {
  try {
    await deleteWeatherRequest(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
