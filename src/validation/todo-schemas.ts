import { string, object, boolean } from "yup";

export const createTodoSchema = object({
  text: string().required("Name must be require"),
  isCompleted: boolean().required("isCompleted must be require"),
});
