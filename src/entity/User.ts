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

  @Column()
  @IsNotEmpty()
  @IsEmail()
  @Index({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  dateBirth: string;
}

export default User;