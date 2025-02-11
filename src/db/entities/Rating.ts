import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import { Book } from './Book';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  value: number;

  @ManyToOne(() => User, (user) => user.rating)
  user: User;

  @ManyToOne(() => Book, (book) => book.rating)
  book: Book;
}