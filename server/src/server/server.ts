import { initMongoConnection } from "../db/mongo-connection";
import { app } from "./app";
import { initDb } from "../db/init/init-db";

export const initializeApplication: () => Promise<void> = async () => {
    await initMongoConnection();
    await initDb();

    const port = 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
    });
};