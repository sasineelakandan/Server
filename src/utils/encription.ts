import bcrypt from "bcryptjs";
import { BCRYPT_SALT } from "./constant";
export function encryptPassword(password: string): string {
    try {
      return bcrypt.hashSync(password, BCRYPT_SALT());
    } catch (error: any) {
      throw new Error(error.message);
    }
  }