import { Router } from "express";
import adminRouter from "./admin.routes";
import authRouter from "./auth.routes";
import interviewRouter from "./interview.routes";
import jobRouter from "./job.routes";
import postRouter from "./post.routes";
import postQuestionRouter from "./postQuestion.routes";
import schoolRouter from "./school.routes";
import jobRequestRouter from "./jobRequest.routes";
import schoolTeacherRouter from "./schoolTeacher.routes";
import teacherRouter from "./teacher.routes";
import teacherExperienceRouter from "./teacherExperience.routes";
import teacherCertificateRouter from "./teacherCertificate.routes";
import notificationsRouter from "./notifications.routes";

const router: Router = Router();

router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/interview", interviewRouter);
router.use("/job", jobRouter);
router.use("/job-request", jobRequestRouter);
router.use("/post", postRouter);
router.use("/post-question", postQuestionRouter);
router.use("/school", schoolRouter);
router.use("/school-teacher", schoolTeacherRouter);
router.use("/teacher", teacherRouter);
router.use("/teacher-experience", teacherExperienceRouter);
router.use("/teacher-certificate", teacherCertificateRouter);
router.use("/notification", notificationsRouter);

export { router };
