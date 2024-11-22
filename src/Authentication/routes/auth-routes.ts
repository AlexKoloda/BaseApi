import { Router } from "express";
import authController from "../controller/auth-controller";

const authRouter = Router();

authRouter.post("/reg", authController.registration);

export default authRouter;
