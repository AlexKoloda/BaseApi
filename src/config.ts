import { TodoType, UserInterface } from "./types/types";




declare global {
  namespace Express {
    interface Request {
      user?: UserInterface,
      todo?: TodoType,
    }
  }
}

