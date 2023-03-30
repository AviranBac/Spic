import { authenticate } from "../auth/auth-middleware";
import { Request, Response, Router } from "express";
import { getAllItems } from "../db/dal/items.dal";

const router = Router();

router.get('/', authenticate, async (req: Request, res:Response) => {
    res.send(await getAllItems());
});

export default router;