import { Router } from "express";
import UserController from "../User/controller/user-controller";

const userRouter = Router();

userRouter.get("/user", UserController.getUsers);
userRouter.get("/user/:id", UserController.getUser);
userRouter.patch("/user", UserController.updateUser);
userRouter.delete("/user/:id", UserController.deleteUser);

export default userRouter;
