import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { SignUpValidation, LoginValidation } from "../features/user/user.validation";

const router = Router();


router.post("/signup", SignUpValidation, authController.signUp);

router.get("/complete-auth", authController.completeAuth);

router.post("/login", LoginValidation, authController.logIn);

router.post("/check-token", authController.checkUserToken);


export const AuthRouters = router;