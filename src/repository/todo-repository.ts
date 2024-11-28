import { AppDataSource } from "../db/data-source";
import { Todo } from "../db/entities/Todo";

export const todoRepository = AppDataSource.getTreeRepository(Todo);