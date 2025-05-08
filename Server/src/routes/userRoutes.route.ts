import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controller";
import { loginValidator, signupValidator, validate } from "../utils/validators";
import { verifyToken } from "../utils/token.manager";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes;
