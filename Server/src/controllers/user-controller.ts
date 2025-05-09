import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";

import User from "../models/User";
import { createToken } from "../utils/token.manager";
import { AUTH_COOKIE } from "../utils/constants";

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Error from User controller", cause: error.message });
  }
};

const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { fullname, email, password } = req.body;

    const isUserExists = User.findOne({ email });
    if (!isUserExists) return res.status(401).send("User already exists");

    const hashedPassword = await hash(password, 10);
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save()

    // Create token and store cookies
    const token = createToken(newUser._id.toString(), newUser.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(AUTH_COOKIE, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: "OK",
      email: newUser.email,
      fullname: newUser.fullname,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Error from User controller", cause: error.message });
  }
};

const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not exist");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Incorrect Password");

    res.clearCookie(AUTH_COOKIE, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(AUTH_COOKIE, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", email: user.email, fullname: user.fullname });
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Error from User controller", cause: error.message });
  }
};

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await User.findById({ _id: res.locals.jwtData.id });
    if (!user) return res.status(401).send("User not exist");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", email: user.email, fullname: user.fullname });
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Error from User controller", cause: error.message });
  }
};

const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await User.findById({ _id: res.locals.jwtData.id });
    if (!user) return res.status(401).send("User not exist");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(AUTH_COOKIE, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", email: user.email, fullname: user.fullname });
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Error from User controller", cause: error.message });
  }
};

export { getAllUsers, userSignup, userLogin, verifyUser, userLogout };
