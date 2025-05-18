import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import ExperienceDto from "../models/experience.dto";
import { TeacherExperienceController } from "../controllers/index";
import { TeacherExperienceDto } from "../models/teacherExperience.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(ExperienceDto),
  Validator(TeacherExperienceDto),
  TeacherExperienceController.create
);
router.get("/", authenticationMiddleware, TeacherExperienceController.get);
router.put("/", authenticationMiddleware, TeacherExperienceController.update);
router.delete(
  "/",
  authenticationMiddleware,
  TeacherExperienceController.remove
);

export default router;
