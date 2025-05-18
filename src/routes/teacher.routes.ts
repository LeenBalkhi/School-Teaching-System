import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { TeacherController } from "../controllers/index";
import TeacherDto from "../models/teacher.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(TeacherDto),
  TeacherController.create
);
router.get("/", authenticationMiddleware, TeacherController.get);
router.put("/", authenticationMiddleware, TeacherController.update);
router.delete("/", authenticationMiddleware, TeacherController.remove);

export default router;
