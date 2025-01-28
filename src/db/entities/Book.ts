import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Author} from "./Author";
import { BookGenre } from './BookGenre';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  isNew: boolean;

  @Column()
  isBestseller: boolean;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];

}