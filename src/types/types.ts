export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateBirth: string;
}

export type CreateUserType = Omit<UserInterface, 'id'>;

export interface UserSchema {
  validate(body: UserInterface, arg1: { abortEarly: boolean }): unknown;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  dateBirth?: string;
}

export interface TodoType {
  id: number;
  text: string;
  isCompleted: boolean;
}

