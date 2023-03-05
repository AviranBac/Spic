import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initializeApplication } from "./server";
import authRouters from "../auth/auth-router";

export const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.get("/", (req: any, res: any) => {
  res.send("This is a test");
});

app.use("/auth", authRouters);

(async () => {
  await initializeApplication();
})();