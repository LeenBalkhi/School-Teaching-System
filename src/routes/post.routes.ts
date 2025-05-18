import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";
import { PostController } from "../controllers/index";
import PostDto from "../models/post.dto";

const router: Router = Router();

router.post(
  "/",
  authenticationMiddleware,
  Validator(PostDto),
  PostController.create
);
router.get("/", authenticationMiddleware, PostController.get);
router.put("/", authenticationMiddleware, PostController.update);
router.delete("/", authenticationMiddleware, PostController.remove);

export default router;
