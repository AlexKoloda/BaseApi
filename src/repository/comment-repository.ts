import { AppDataSource } from '../db/data-source';
import { Comment } from '../db/entities/Comment';


export const commentRepository = AppDataSource.getTreeRepository(Comment);