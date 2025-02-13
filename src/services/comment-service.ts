import { Comment } from '../db/entities/Comment';
import { commentRepository } from '../repository/comment-repository';
import bookService from './book-service';
import userService from './user-service';

interface IComment {
  text: string,
  userId: string,
  bookId: string,
}

class CommentService {

  async addComment(data: IComment) {
    const user = await userService.getUser(data.userId);
    const book = await bookService.getBook(data.bookId);
    const comment = new Comment();
    comment.user = user;
    comment.book = book;
    comment.text = data.text;
    commentRepository.save(comment);
    const newComment = await commentRepository.findOne({
      relations: {
        user: true,
      },
      where: {
        id: comment.id
      }
    })
    return newComment;
    }
  
  async getBookComments(bookId) {
    return commentRepository.find({
      where: {
        book: {
          id: bookId,
        }
      }
    })
  }


}

export default new CommentService();