import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { initializeApplication } from "./server";
import { StatusCodes } from "http-status-codes";
import authRouters from "../routes/auth.routes";
import categoriesRouters from "../routes/categories.routes";
import itemsRouters from "../routes/items.routes";
import photosRouters from "../routes/photos.routes";
import ttsRouters from '../routes/text-to-speech.routes';
import favoriteRouters from "../routes/favorites.routes";
import UserRouters from "../routes/user.routes";
import path from 'path';

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

export const app = express();

const routesPath = path.resolve(__dirname, '../routes/*.ts');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Spic API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: [routesPath]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.json({limit: '50mb'}));
app.use(
    cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: StatusCodes.OK
    })
);

app.use("/auth", authRouters);
app.use("/categories", categoriesRouters);
app.use("/favorites", favoriteRouters);
app.use("/items", itemsRouters);
app.use('/photos', photosRouters);
app.use('/tts', ttsRouters);
app.use('/user', UserRouters);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
    await initializeApplication();
})();
