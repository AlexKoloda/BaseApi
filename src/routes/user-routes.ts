import { Router } from 'express';
import userController from '../controllers/user-controller';
import { validate } from '../validation/validate';
import { updateUserSchema } from '../validation/user-schemas';

const userRouter = Router();

userRouter.get('/all', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.patch('/', validate(updateUserSchema), userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
