import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const err = validationResult(req);
    if (err.isEmpty()) return next();
    res.status(422).json({ error: err.array() });
  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email if require,d"),
  body("password")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Atleast 6 characters"),
];
export const signupValidator = [
  body("fullname").notEmpty().withMessage("Name if required"),
  ...loginValidator
];
