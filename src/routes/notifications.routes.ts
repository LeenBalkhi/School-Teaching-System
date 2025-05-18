import { Router } from "express";
import { NotificationsController } from "../controllers";
import authenticationMiddleware from "../middleware/auth";

const router: Router = Router();

router.get("/", authenticationMiddleware, NotificationsController.get);
router.put("/", authenticationMiddleware, NotificationsController.update);
router.delete("/", authenticationMiddleware, NotificationsController.remove);

export default router;
