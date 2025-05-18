import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { JobController } from "../controllers/index";
import JobDto from "../models/job.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(JobDto),
  // JobController.validateExperience,
  JobController.create
);
router.get("/", authenticationMiddleware, JobController.get);
router.put("/", authenticationMiddleware, JobController.update);
router.delete("/", authenticationMiddleware, JobController.remove);

export default router;
