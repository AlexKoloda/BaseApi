import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { BadParams } from './custom-errors';
import conf from '../config';
config();

const createJwt = (id: number) => {
  try {
    const token = sign({ id }, conf.token.secret, {
      expiresIn: conf.token.exp,
    });
    return token;
  } catch (err) {
    throw new BadParams('Authenticate error');
  }
};

export default createJwt;
