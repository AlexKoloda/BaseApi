import { string, object, boolean } from "yup";

export const createTodoSchema = object({
  text: string().required("Text must be require"),
  isCompleted: boolean().required("isCompleted must be require"),
});

export const updateTodoSchema = object({
  text: string().min(1, "Text must be require"),
  isCompleted: boolean(),
});
