import { initMongoConnection } from "../db/mongo-connection";
import { app } from "./app";
import { initCategoriesAndItemsInDb } from "../db/dal/init-db";

export const initializeApplication: () => Promise<void> = async () => {
    await initMongoConnection();
    await initCategoriesAndItemsInDb();

    const port = 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
    });
};