import { Router } from "express";
import Validator from "../utils/requestValidator";
import { AdminController } from "../controllers/index";
import authenticationMiddleware from "../middleware/auth";

const router: Router = Router();

router.get("/", authenticationMiddleware, AdminController.getList);

export default router;
