import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { ValidationFailure } from '../util/custom-errors';
import { parseValidationErrors } from '../util/errorReader';
import { UserSchema } from '../types/types';

export const validate =
  (schema: UserSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const customError = parseValidationErrors(err);
        next(new ValidationFailure(customError));
        return;
      }
      next(err);
    }
  };
