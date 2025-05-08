import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./db/connection";
import appRoutes from "./routes/appRouter.route";

dotenv.config();

const app: Application = express();

// MIDDLEWARES
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET!));

// REMOVE IT IN THE PRODUCTION
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

// ROUTES
app.use("/api/v1", appRoutes);

// DB CONNECTIONS
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Go and catch the backend on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
