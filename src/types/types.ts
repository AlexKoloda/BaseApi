export interface UserInterface {
  id: number;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
}

export type CreateUserType = Omit<UserInterface, 'id'>;

export interface UserSchema {
  validate(body: UserInterface, arg1: { abortEarly: boolean }): unknown;
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export interface BookType {
  id: number;
  photo: string;
  title: string,
  description: string,
  price: string,
  isNew: boolean,
  isBestseller: boolean,
}

