import { validationResult } from "express-validator";

export function validate(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.status = 422;
    error.details = errors.array().map((item) => ({ field: item.path, message: item.msg }));
    return next(error);
  }
  return next();
}
