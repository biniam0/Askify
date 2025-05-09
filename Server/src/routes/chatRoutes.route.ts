import { Router } from "express";
import { verifyToken } from "../utils/token.manager";
import { chatCompletionValidator, validate } from "../utils/validators";
import {
  generateChatCompletion,
  sendChatsToUser,
  deleteUserChats
} from "../controllers/chat-controller";

const chatRoutes = Router();

// Protected Routes
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete-chats", verifyToken, deleteUserChats);


export default chatRoutes;
