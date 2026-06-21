import { Router } from "express";
import { body } from "express-validator";
import { searchWeather } from "../controllers/weatherController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post(
  "/search",
  [
    body("query").trim().isLength({ min: 2 }).withMessage("Enter a city, ZIP/postal code, landmark, or coordinates."),
    body("startDate").optional({ values: "falsy" }).isISO8601().withMessage("Start date must be an ISO date."),
    body("endDate").optional({ values: "falsy" }).isISO8601().withMessage("End date must be an ISO date."),
    body("notes").optional({ values: "falsy" }).isLength({ max: 500 }).withMessage("Notes must be under 500 characters.")
  ],
  validate,
  searchWeather
);

export default router;
