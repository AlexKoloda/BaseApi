import { AppDataSource } from '../db/data-source';
import Cart from '../db/entities/Cart';

export const cartRepository = AppDataSource.getTreeRepository(Cart);