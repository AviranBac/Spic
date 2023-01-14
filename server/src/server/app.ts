import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initializeApplication } from "./server";

export const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

(async () => {
    await initializeApplication();
})();