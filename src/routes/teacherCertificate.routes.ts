import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { TeacherCertificateController } from "../controllers";
import { TeacherCertificateDto } from "../models/teacherCertificate.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(TeacherCertificateDto),
  TeacherCertificateController.create
);
router.get("/", authenticationMiddleware, TeacherCertificateController.get);
router.put("/", authenticationMiddleware, TeacherCertificateController.update);
router.delete(
  "/",
  authenticationMiddleware,
  TeacherCertificateController.remove
);

export default router;
