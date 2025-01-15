import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: "email",
    unique: true,
  })
  email: string;

  @Column()
  avatar: string;

  @Column({ select: false })
  password: string;

}
