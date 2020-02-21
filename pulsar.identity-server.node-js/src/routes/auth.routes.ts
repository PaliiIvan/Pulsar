const router = require("express").Router();

import { SignUp, CompleteAuth, LogIn, LogOut, CheckToken } from "../controllers/auth.controller";
import { SignUpValidation, LoginValidation } from "../features/user/user.validation";



router.post("/signup", SignUpValidation, SignUp);

router.get("/complete-auth" ,CompleteAuth);

router.post("/login", LoginValidation, LogIn);

router.get("/logout", LogOut);

router.get("/check-token", CheckToken);


export const Router = router;