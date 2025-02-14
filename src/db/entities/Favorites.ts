import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import User from './User';
import { Book } from './Book';

@Entity()
@Unique(['user', 'book'])
export default class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Book, (book) => book.favorites)
  book: Book;

  @CreateDateColumn()
  dateAdded: Date;
}