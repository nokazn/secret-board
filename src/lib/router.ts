import { IncomingMessage, ServerResponse } from 'http';
import { posts } from '../services/posts';
import { logout } from '../services/logout';
import { notFound } from '../services/notFound';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/posts':
      posts(req, res);
      break;
    case '/logout':
      logout(req, res);
      break;
    default:
      notFound(req, res);
  }
};
