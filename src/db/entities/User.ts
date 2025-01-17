import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'User' + Date.now()
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: '',
  })
  avatar?: string;

  @Column({ select: false })
  password: string;

}
