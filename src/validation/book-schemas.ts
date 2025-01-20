import { string, object, boolean } from 'yup';

export const createBookSchema = object({
  photo: string().required('Photo must be require'),
  title: string().required('Title must be require'),
  author: string().required('Author must be require'),
  description: string().required('Description must be require'),
  price: string().required('Price must be require'),
  isNew: boolean().required('isNew must be require'),
  isBestseller: boolean().required('isBestseller must be require'),
});

export const updateTodoSchema = object({
  text: string().min(1, 'Text must be require'),
  isCompleted: boolean(),
});
