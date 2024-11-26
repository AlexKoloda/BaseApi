import { Router } from "express";
import userController from "../ controllers/user-controller";

const userRouter = Router();

userRouter.get("/all", userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.patch("/", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
