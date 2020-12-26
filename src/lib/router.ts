import { IncomingMessage, ServerResponse } from 'http';
import { PostService } from '../services/PostService';
import { logout } from '../services/logout';
import { notFound } from '../services/notFound';

export const router = (req: IncomingMessage & { user?: string }, res: ServerResponse) => {
  switch (req.url) {
    case '/posts':
      if (req.user != null) {
        PostService(req as IncomingMessage & { user: string }, res);
      } else {
        notFound(req, res);
      }
      break;
    case '/logout':
      logout(req, res);
      break;
    default:
      notFound(req, res);
  }
};
