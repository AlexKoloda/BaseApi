import { Entity, PrimaryGeneratedColumn, Column, Unique, } from "typeorm";

@Entity()
@Unique(["email"])

export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Unique(["email"])
  @Column({
    name: "email",
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  dateBirth: string;
}
