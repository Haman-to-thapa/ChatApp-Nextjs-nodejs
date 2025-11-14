import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const jWT_SECRET = process.env.jWT_SECRET;
export const generateToken = (user) => {
    return jwt.sign({ user }, jWT_SECRET, { expiresIn: "15d" });
};
//# sourceMappingURL=generateToken.js.map