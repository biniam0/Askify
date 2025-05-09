import { Router } from "express";
import { verifyToken } from "../utils/token.manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import generatechatCompletion from "../controllers/chat-controller";

const chatRoutes = Router();

// Protected Routes
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generatechatCompletion
);

export default chatRoutes;
