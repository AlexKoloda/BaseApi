import { NextFunction, Request, Response } from "express";
import { string, object, number, ValidationError, tuple } from "yup";
import { NotValidType } from "../util/custom-errors";
import { readError } from "../util/errorReader";

export const userSchema = object({
  firstName: string().min(1, "Name must be more than 1 characters").required(),
  lastName: string().min(1, "Surname must be more than 1 characters").required(),
  email: string().email("Email must be with @").required(),
  password: string().min(6, "Password must be more than 6 characters").required(),
  dateBirth: string().min(1).required(),
});

export const signInSchema = object({
  email: string().email("Email must be with @").required("Email must be require"),
  password: string().min(6, "Password must be more than 6 characters").required(),
});

export const idSchema = object({
  id: string().required("Id must be require"),
});

export const validate = (schema) => async (req: Request, res:Response, next:NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err instanceof ValidationError) {

        const customError = readError(err)
        console.log(customError)
        next(new NotValidType(customError.message))
        return
      }
      next(err) 

    res.status(500).json({ message: err.message });
  }
};

export const validateId = (schema) => async (req: Request, res:Response, next:NextFunction) => {

  try {
    await schema.validate(req.params);
    next();
  } catch (err) {
    
    if (err instanceof ValidationError) {

    const customError = readError(err)
    console.log(customError)
    next(new NotValidType(customError.message))
    return
  }
  next(err) 

res.status(500).json({ message: err.message });
}
};


