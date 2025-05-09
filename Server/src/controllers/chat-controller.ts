import { Request, Response, NextFunction } from "express";
import User from "../models/User";
// GEMINI
import { GoogleGenAI } from "@google/genai";

// OPENAI
import { ChatCompletionMessageParam } from "openai/resources/chat/index";
import OpenAI from "openai";

const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { message } = req.body;
  // GEMINI
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });
    }
    // Grab chats of user and store it in chats list and user chat list in the db
    const chats = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant" | "system",
      content,
    }));
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // Initialize OpenAI client
    const gemini = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // Send chats to Gemini API
    const geminiResponse = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });

    const geminiMessage = {
      role: "assistant",
      content: geminiResponse.text,
    };

    user.chats.push(geminiMessage);
    user.save();

    res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occurred while fetching OpenAI response" });
  }
};

export default generateChatCompletion;
