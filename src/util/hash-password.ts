import { pbkdf2Sync } from 'crypto';
import { config } from 'dotenv';
import conf from '../config';
config();

export const generateHashPassword = (password: string) => {

  const generateHash = pbkdf2Sync(password, conf.salt, 1000, 64, 'sha512').toString(
    'hex'
  );
  return generateHash;
};
