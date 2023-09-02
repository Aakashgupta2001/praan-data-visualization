import { Router } from "express";
import * as userController from "../controller/user";

const router = Router();

// Routes for auth API's
router.post("/login", userController.login);
router.post("/signup", userController.signup);

export default router;
