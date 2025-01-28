import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { Genre } from './Genre';


@Entity() 
export class BookGenre {

 @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.bookGenres)
  book: Book;

  @ManyToOne(() => Genre, (genre) => genre.bookGenres)
  genre: Genre;


}