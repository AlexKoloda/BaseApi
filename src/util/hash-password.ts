import { pbkdf2Sync } from "crypto";
import { config } from "dotenv";
config();

export const generateHashPassword = (password: string) => {
  const salt = process.env.SALT;
  const generateHash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString(
    "hex"
  );
  return generateHash;
};
