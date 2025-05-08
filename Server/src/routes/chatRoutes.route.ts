import { Router } from "express";
import { verifyToken } from "../utils/token.manager";

const chatRoutes = Router()

// Protected Routes
chatRoutes.post("/new", verifyToken)

export default chatRoutes