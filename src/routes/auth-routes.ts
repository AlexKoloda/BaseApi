import { Router } from "express";
import authController from "../controllers/auth-controller";
import { } from "../middleware";
import { signInSchema, userSchema, validate } from "../validation/yups";

const authRouter = Router();

authRouter.post("/sign-up", validate(userSchema), authController.registration);
authRouter.post("/sign-in", validate(signInSchema), authController.login);

export default authRouter;
