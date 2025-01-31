export interface UserInterface {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  password: string;
}

export type CreateUserType = Omit<UserInterface, 'id'>;

export interface UserSchema {
  validate(body: UserInterface, arg1: { abortEarly: boolean }): unknown;
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface BookType {
  id: string;
  photo: string;
  title: string,
  description: string,
  price: number,
  isNew: boolean,
  isBestseller: boolean,
}

export interface queryType {
  page: string,
  genre?: string,
  sort: string,
  price?: string,
}

