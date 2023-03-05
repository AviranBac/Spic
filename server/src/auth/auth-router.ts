import { Router } from "express";

import * as Auth from "../auth/auth";
import AuthValidation from "../auth/validation";

const router = Router();

router.post("/register", AuthValidation(), Auth.register);

router.post("/login", Auth.login);

export default router;