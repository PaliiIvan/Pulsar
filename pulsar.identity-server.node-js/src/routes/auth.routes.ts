import { Router } from "express";

import { SignUpValidation, LoginValidation } from "../features/user/user.validation";

import * as authController from "../controllers/auth.controller";

const router = Router();


router.post("/signup", SignUpValidation, authController.signUp);

router.post("/complete-auth", authController.completeAuth);

router.post("/login", LoginValidation, authController.logIn);

router.post("/check-token", authController.checkUserToken);

router.post("/regenerate-token", authController.regenerateToken);

router.post("/authenticate-server-user", authController.postCheckApiToken);

export const AuthRouters = router;