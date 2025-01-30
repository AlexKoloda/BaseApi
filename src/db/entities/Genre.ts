import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookGenre } from './BookGenre';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];
}
