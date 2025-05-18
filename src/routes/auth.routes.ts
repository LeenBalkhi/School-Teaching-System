import { Router } from "express";
import { AuthController } from "../controllers";
import Validator from "../utils/requestValidator";
import LoginDto from "../models/login.dto";
import UserDto from "../models/user.dto";

const router: Router = Router();

router.post("/login", Validator(LoginDto), AuthController.login);
router.post("/signup", Validator(UserDto), AuthController.signup);

export default router;
