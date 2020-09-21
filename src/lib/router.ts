import { IncomingMessage, ServerResponse } from 'http';
import { posts } from '../services/posts';

export const router = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/posts':
      posts(req, res);
      break;
    case '/logout':
      // @todo
      break;
    default:
      break;
  }
};
