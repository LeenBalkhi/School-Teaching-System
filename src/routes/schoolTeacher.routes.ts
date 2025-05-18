import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { SchoolTeacherController } from "../controllers";
import { SchoolTeacherDto } from "../models/schoolTeacher.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(SchoolTeacherDto),
  SchoolTeacherController.create
);
router.get("/", authenticationMiddleware, SchoolTeacherController.get);
router.put("/", authenticationMiddleware, SchoolTeacherController.update);
router.delete("/", authenticationMiddleware, SchoolTeacherController.remove);

export default router;
