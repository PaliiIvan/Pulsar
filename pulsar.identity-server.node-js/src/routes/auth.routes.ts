import { Router } from "express";
import { SignUp, CompleteAuth, LogIn, CheckUserToken } from "../controllers/auth.controller";
import { SignUpValidation, LoginValidation } from "../features/user/user.validation";

const router = Router();


router.post("/signup", SignUpValidation, SignUp);

router.get("/complete-auth", CompleteAuth);

router.post("/login", LoginValidation, LogIn);

router.post("/check-token", CheckUserToken);


export const AuthRouters = router;