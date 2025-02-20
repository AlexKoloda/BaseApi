import { Router } from 'express';
import userController from '../controllers/user-controller';
import { validate } from '../validation/validate';
import { updatePasswordSchema, updateUserPhoto, updateUserSchema } from '../validation/user-schemas';

const userRouter = Router();

userRouter.get('/', userController.getUser);
userRouter.get('/all', userController.getUsers);
userRouter.patch('/photo', userController.updateUserPhoto);
userRouter.patch('/', validate(updateUserSchema), userController.updateUser);
userRouter.patch('/password', validate(updatePasswordSchema), userController.updateUserPassword);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
