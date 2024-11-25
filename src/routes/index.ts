import { Router } from "express";
import authRouter from "./auth-routes";
import userRouter from "./user-routes";
import passport = require("passport");

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", passport.authenticate("jwt", {session: false}), userRouter);

export default mainRouter;
