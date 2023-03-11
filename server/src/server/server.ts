import * as dotenv from "dotenv";
dotenv.config();

import { initMongoConnection } from "../db/mongo-connection";
import { app } from "./app";


export const initializeApplication: () => Promise<void> = async () => {
    await initMongoConnection();

    const port = 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
    });
};