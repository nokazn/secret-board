import { IncomingMessage, ServerResponse } from 'http';
import { PostController } from '../controllers/PostController';
import { handleNotFound, handleLogout } from '../controllers/utils';

export const router = (req: IncomingMessage & { user?: string }, res: ServerResponse) => {
  switch (req.url) {
    case '/posts':
      if (req.user != null) {
        PostController(req as IncomingMessage & { user: string }, res);
      } else {
        handleNotFound(req, res);
      }
      break;
    case '/logout':
      handleLogout(req, res);
      break;
    default:
      handleNotFound(req, res);
  }
};
