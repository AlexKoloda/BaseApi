export interface CreateUserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateBirth: string;
}

export interface GetUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateBirth: string;
}