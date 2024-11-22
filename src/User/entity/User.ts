import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  // TODO Переделать валидацию email
  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  dateBirth: string;
}

export default User;