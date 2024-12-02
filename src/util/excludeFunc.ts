import { Todo } from '../db/entities/Todo';
import { CreateUserType, TodoType } from '../types/types';

export const excludePassword = (user: CreateUserType) => {
  return delete user.password;
};

export const excludeUser = ( todo: Todo)  => {
  return delete todo.user;
}