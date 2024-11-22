import { Router } from "express";
import UserController from "../controller/user-controller";

const userRouter = Router();

userRouter.get("/user", UserController.getUsers);
userRouter.get("/user/:id", UserController.getUser);
userRouter.put("/user", UserController.updateUser);
userRouter.delete("/user/:id", UserController.deleteUser);

export default userRouter;