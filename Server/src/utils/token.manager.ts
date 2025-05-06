import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
  return token;
};
