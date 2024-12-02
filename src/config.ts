import { UserInterface } from './types/types';
import { config } from 'dotenv';
config();

declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
    }
  }
}

const conf = {
  database: {
    host: process.env.HOST,
    userName: process.env.DB_USER_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },

  server: {
    port: process.env.PORT,
  },

  token: {
    secret: process.env.TOKEN_SECRET,
    exp: process.env.EXP,
  },

  salt: process.env.SALT,
};

console.log(conf.database.userName);

export default conf;
