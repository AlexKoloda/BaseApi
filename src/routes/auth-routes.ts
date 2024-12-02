import { Router } from 'express';
import authController from '../controllers/auth-controller';
import { validate } from '../validation/validate';
import { createUserSchema, signInSchema } from '../validation/user-schemas';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validate(createUserSchema),
  authController.registration
);
authRouter.post('/sign-in', validate(signInSchema), authController.login);

export default authRouter;
