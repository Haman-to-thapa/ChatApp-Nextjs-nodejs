import type { NextFunction, Request, Response } from "express";
import type { Document } from "mongoose";
import jwt, { type JwtPayload } from 'jsonwebtoken'

interface IUser extends Document {
  _id: string;
  name: string;
  email:string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null
}

 const isAuth = async(req:AuthenticatedRequest, res:Response, next:NextFunction) : Promise<void> => {
  const authHeader = req.headers.authorization;

 try {
   if(!authHeader || !authHeader.startsWith("Bearer")){
    res.status(401).json({
      message:"Please Login - No Auth header"
    })
    return;
  }

  const token = authHeader.split(" ")[1];
    if (!token) {
     res.status(401).json({ message: "Invalid token format" });
      return;
     }

   const decodedValue = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

   if(!decodedValue || !decodedValue.user) {
    res.status(401).json({
      message:"Invalid token"
    })
    return
   }

   req.user = decodedValue.user

   next()
 } catch (error) {
  res.status(401).json({
    message:"Please Login -JWT errror"
  })
 }
}

export default isAuth;