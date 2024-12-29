import bcrypt from "bcryptjs";
import { BCRYPT_SALT } from "./constant";
export function encryptPassword(password) {
    try {
        return bcrypt.hashSync(password, BCRYPT_SALT());
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export function comparePassword(inputPassword, passwordFromDb) {
    try {
        return bcrypt.compareSync(inputPassword, passwordFromDb);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
