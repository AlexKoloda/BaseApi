import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Author} from "./Author";
import { BookGenre } from './BookGenre';

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

  @Column({ type: 'float', default: 14.99 })
  price: number;

  @Column()
  isNew: boolean;

  @Column()
  isBestseller: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];

}