import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { InterviewController } from "../controllers/index";
import InterviewDto from "../models/interview.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(InterviewDto),
  InterviewController.create
);
router.get("/", authenticationMiddleware, InterviewController.get);
router.put("/", authenticationMiddleware, InterviewController.update);
router.delete("/", authenticationMiddleware, InterviewController.remove);
router.get("/schedule", authenticationMiddleware, InterviewController.getInterviewsSchedule);

export default router;
