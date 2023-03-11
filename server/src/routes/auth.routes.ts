import { Router } from "express";

import * as Auth from "../auth/auth-functions";
import AuthValidation from "../auth/validation";

const router = Router();

router.post("/register", AuthValidation(), Auth.register);

router.post("/login", AuthValidation(), Auth.login);

router.post("/refreshToken", Auth.refreshAccessTokenHandler);

router.post("/logout", Auth.logout);

export default router;