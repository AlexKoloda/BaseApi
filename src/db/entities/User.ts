import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm";
import Cart from './Cart';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    default: 'User' + Date.now(),
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

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
