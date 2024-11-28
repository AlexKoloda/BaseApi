import { ValidationError } from "yup";
import { ErrorMessagesPaths } from "./custom-errors";

export const parseValidationErrors = (err: ValidationError): ErrorMessagesPaths=> {
  const validErrors = err.inner;

  if (!validErrors) {
    return;
  }
  const errors = [];

  for (let errorMessage of validErrors) {
    errors.push({ path: errorMessage.path, message: errorMessage.message });
  }

  return { paths: errors };
};
