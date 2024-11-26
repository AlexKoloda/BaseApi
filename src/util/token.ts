import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


const createJwt = (email: string) => {
    try {
      const token = sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      });
      return token;
    } catch (err) {
      console.log(err);
    }
  }


export default createJwt;