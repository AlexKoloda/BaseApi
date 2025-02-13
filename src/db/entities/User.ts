import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm";
import Cart from './Cart';
import { Rating } from './Rating';
import { Comment } from './Comment';

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

  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;


}
