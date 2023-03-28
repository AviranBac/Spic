import { initMongoConnection } from "../db/mongo-connection";
import { app } from "./app";

export const initializeApplication: () => Promise<void> = async () => {
    await initMongoConnection();
    // TODO: remove from comment every time we want to add categories
    // await initCategoriesDb();

    const port = 8080;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}!`);
    });
};