import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { AUTH_COOKIE } from "./constants";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<any> => {
  const token = await req.signedCookies[`${AUTH_COOKIE}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({message: "Token Not Received"})
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET!, (err: any, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        console.log("Token Verification Successful");
        resolve()
        res.locals.jwtData = success
        return next()
      }
    });
  });
};
