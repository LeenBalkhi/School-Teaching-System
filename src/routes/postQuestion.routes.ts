import { Router } from "express";
import Validator from "../utils/requestValidator";
import authenticationMiddleware from "../middleware/auth";

const router: Router = Router();


export default router;
