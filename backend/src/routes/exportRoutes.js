import { Router } from "express";
import { param } from "express-validator";
import { exportData } from "../controllers/exportController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get(
  "/:format",
  [param("format").isIn(["json", "csv", "pdf", "markdown", "md"]).withMessage("Use json, csv, pdf, or markdown.")],
  validate,
  exportData
);

export default router;
