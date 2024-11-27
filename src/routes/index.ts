import { Router } from "express";
import authRouter from "./auth-routes";
import userRouter from "./user-routes";
import { authenticateToken } from "../middleware";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", authenticateToken, userRouter);
export default mainRouter;
 