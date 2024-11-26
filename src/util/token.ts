import { sign } from "jsonwebtoken";
import { config } from "dotenv";
config();

const createJwt = (id: number) => {
  try {
    const token = sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.EXP,
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

export default createJwt;
