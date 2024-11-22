export interface CreateUserInterface {
  id: number;
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
  // TODO Скрыть пароль
  password: string; 
  dateBirth: string;
}