import { string, object, boolean, date, number } from 'yup';

export const addCommentSchema = object({
  text: string().required('Text must be require'),
  bookId: string().required('BookId must be require'),
});