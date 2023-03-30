import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllCategories } from "../db/dal/categories.dal";

const router = Router();

router.get('/', authenticate, async (req: Request, res:Response) => {
    res.send(await getAllCategories());
});

export default router;