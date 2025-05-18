import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { SchoolController } from "../controllers/index";
import SchoolDto from "../models/school.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(SchoolDto),
  SchoolController.create
);
router.get("/", authenticationMiddleware, SchoolController.get);
router.put("/", authenticationMiddleware, SchoolController.update);
router.delete("/", authenticationMiddleware, SchoolController.remove);

export default router;
