import { Router } from "express";
import userController from "../controllers/user-controller";
import { idSchema, userSchema, validate, validateId } from "../validation/yups";

const userRouter = Router();

userRouter.get("/all", userController.getUsers);
userRouter.get("/:id", validateId(idSchema), userController.getUser);
userRouter.patch("/", validate(userSchema), userController.updateUser);
userRouter.delete("/:id", validate(idSchema), userController.deleteUser);

export default userRouter;
