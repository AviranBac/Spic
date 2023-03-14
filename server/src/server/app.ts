require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { initializeApplication } from "./server";
const { photosRouter } = require("./routes/photos");

export const app = express();

app.use(bodyParser.json());
app.use('/photos', photosRouter);

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
  
(async () => {
    await initializeApplication();
})();