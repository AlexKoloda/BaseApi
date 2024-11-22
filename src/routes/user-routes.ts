import { Router } from "express";
import UserController from "../User/controller/user-controller";

const userRouter = Router();

userRouter.get("/all", UserController.getUsers);
userRouter.get("/:id", UserController.getUser);
userRouter.patch("/update", UserController.updateUser);
userRouter.delete("/delete/:id", UserController.deleteUser);

export default userRouter;
