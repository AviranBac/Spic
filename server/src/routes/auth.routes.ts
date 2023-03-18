import { Router } from "express";

import * as Auth from "../auth/auth-functions";
import AuthValidation from "../auth/validation";

const router = Router();

router.post("/signup", AuthValidation(), Auth.signUp);

router.post("/signin", AuthValidation(), Auth.signIn);

router.post("/refreshtoken", Auth.refreshAccessTokenHandler);

router.post("/signout", Auth.signOut);

export default router;