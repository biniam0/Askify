import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connectToDatabase } from "./db/connection";
import morgan from "morgan"

config();

const app: Application = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"))

const port = process.env.PORT || 3000;

// ROUTES
app.use("/api/v1", appRoutes)

// DB CONNECTIONS
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Go and catch the backend on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
