import { Router } from "express";
import authController from "../Authentication/controller/auth-controller";

const authRouter = Router();

authRouter.post("/sign-up", authController.registration);

export default authRouter;
