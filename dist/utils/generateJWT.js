import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constant";
export function generateAccessToken(id, role) {
    try {
        const payload = { id, role };
        const options = { expiresIn: "1h" };
        return jwt.sign(payload, JWT_SECRET(), options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
export function generateRefreshToken(id, role) {
    try {
        const payload = { id, role };
        const options = { expiresIn: "7d" };
        return jwt.sign(payload, JWT_SECRET(), options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
