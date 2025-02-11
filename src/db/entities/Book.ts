import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Author} from "./Author";
import { BookGenre } from './BookGenre';
import Cart from './Cart';
import { Rating } from './Rating';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  photo: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date', default: '01-12-2000' })
  dataIssue: Date;

  @Column({ type: 'float', default: 14.99 })
  price: number;

  @Column({ default: 2 })
  numberBooksStock: number;

  @Column()
  isNew: boolean;

  @Column()
  isBestseller: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];

  @OneToMany(() => Rating, (rating) => rating.book)
  rating: Rating;

  @OneToMany(() => Cart, (cart) => cart.user)
    cart: Cart;
}