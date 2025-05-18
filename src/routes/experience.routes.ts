import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { ExperienceController } from "../controllers/index";
import ExperienceDto from "../models/experience.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(ExperienceDto),
  ExperienceController.create
);
router.get("/", authenticationMiddleware, ExperienceController.get);
router.put("/", authenticationMiddleware, ExperienceController.update);
router.delete("/", authenticationMiddleware, ExperienceController.remove);

export default router;
