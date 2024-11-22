import { Router } from "express";
import authRouter from "./auth-routes";
import userRouter from "./user-routes";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
