import { string, object } from "yup";
import { CreateUserInterface } from "../types/types";

const userSchema = object({
  firstName: string().min(1).required(),
  lastName: string().min(1).required(),
  email: string().email().required(),
  password: string().min(6).required(),
  dateBirth: string().min(1).required(),
});

export const isValid = async (data: CreateUserInterface) => {
  return await userSchema.isValid(data);
};