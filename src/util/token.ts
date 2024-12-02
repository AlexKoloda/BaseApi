import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { BadParams } from './custom-errors';
config();

const createJwt = (id: number) => {
  try {
    const token = sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.EXP,
    });
    return token;
  } catch (err) {
    throw new BadParams('Authenticate error');
  }
};

export default createJwt;
