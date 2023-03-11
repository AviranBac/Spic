import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initializeApplication } from "./server";
import { StatusCodes } from "http-status-codes";
import ttsRouter from '../routes/text-to-speech';

export const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: StatusCodes.OK
}));

app.use('/tts', ttsRouter);

(async () => {
    await initializeApplication();
})();