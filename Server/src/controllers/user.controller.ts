import { Request, Response } from "express";
import User from "../models/User";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "Error from User controller", cause: error.message});
  }
};

export default getAllUsers
