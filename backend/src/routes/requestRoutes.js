import { Router } from "express";
import { body, param } from "express-validator";
import { destroy, index, show, update } from "../controllers/requestController.js";
import { validate } from "../middleware/validate.js";

const router = Router();
const idRule = param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer.");

router.get("/", index);
router.get("/:id", [idRule], validate, show);
router.put(
  "/:id",
  [
    idRule,
    body("query").optional({ values: "falsy" }).trim().isLength({ min: 2 }).withMessage("Location must be at least 2 characters."),
    body("startDate").optional({ values: "falsy" }).isISO8601().withMessage("Start date must be an ISO date."),
    body("endDate").optional({ values: "falsy" }).isISO8601().withMessage("End date must be an ISO date."),
    body("notes").optional({ values: "falsy" }).isLength({ max: 500 }).withMessage("Notes must be under 500 characters.")
  ],
  validate,
  update
);
router.delete("/:id", [idRule], validate, destroy);

export default router;
