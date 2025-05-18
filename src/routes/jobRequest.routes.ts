import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { JobRequestController } from "../controllers/index";
import JobRequestDto from "../models/jobRequest.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(JobRequestDto),
  JobRequestController.create
);
router.get("/", authenticationMiddleware, JobRequestController.get);
router.get("/by-job", authenticationMiddleware, JobRequestController.getListForSchoolAndJob)
router.put("/", authenticationMiddleware, JobRequestController.update);
router.delete("/", authenticationMiddleware, JobRequestController.remove);

export default router;
