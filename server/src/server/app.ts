import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { initializeApplication } from "./server";
import authRouters from "../routes/auth.routes";
import { authenticate } from "../auth/auth-middleware";

export const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/auth", authRouters);

app.get("/", authenticate, (req: Request, res: Response) => {
  res.send("This is a authriazed test");
});

(async () => {
  await initializeApplication();
})();
