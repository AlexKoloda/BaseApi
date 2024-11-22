import { Router } from "express";
import UserController from "../controller/user-controller";

const router = Router();

router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getUser);
router.put("/user", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

export default router;