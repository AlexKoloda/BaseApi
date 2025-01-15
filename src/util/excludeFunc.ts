import { Book} from '../db/entities/Book';
import { CreateUserType, TodoType } from '../types/types';

export const excludePassword = (user: CreateUserType) => {
  return delete user.password;
};

export const excludeUser = ( todo: Book)  => {
  console.log('Not work, plz create')
}