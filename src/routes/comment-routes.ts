import { Router } from 'express';
import commentController from '../controllers/comment-controller';
import { validate } from '../validation/validate';
import { addCommentSchema } from '../validation/comment-schemas';

const commentRouter = Router();

commentRouter.post('/', validate(addCommentSchema), commentController.addComment)
commentRouter.get('/get', commentController.getComments)


export default commentRouter;