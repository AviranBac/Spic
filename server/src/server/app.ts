import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import { initializeApplication } from "./server";
import authRouters from "../routes/auth.routes";
import { StatusCodes } from "http-status-codes";

export const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: StatusCodes.OK
  })
);

app.use("/auth", authRouters);

// TODO: make sure to add "authenticate" middleware to newer routes after merge

(async () => {
  await initializeApplication();
})();
