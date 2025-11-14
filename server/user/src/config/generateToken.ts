import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


dotenv.config()

const jWT_SECRET = process.env.jWT_SECRET as string;

export const generateToken = (user:any) => {
return jwt.sign({user}, jWT_SECRET, {expiresIn: "15d"})
}