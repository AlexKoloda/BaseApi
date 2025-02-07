import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';
import { Book } from './Book';

@Entity()
export default class CartItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToOne(() => Book, (book) => book.cart)
  book: Book;
}