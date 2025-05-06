import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user.controller";
import { loginValidator, signupValidator, validate } from "../utils/validators";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;
