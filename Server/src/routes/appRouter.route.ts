import { Router } from "express";
import userRoutes from "./userRoutes.route";
import chatRoutes from "./chatRoutes.route";

const appRoutes = Router()

appRoutes.use("/user", userRoutes)
appRoutes.use("/chat", chatRoutes)

export default appRoutes