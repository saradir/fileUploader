import { validationResult } from "express-validator";
export function routeValidationHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // You can choose 400 or 404 depending on your taste
    return res.status(404).render('404');
  }
  next();
}
