import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
