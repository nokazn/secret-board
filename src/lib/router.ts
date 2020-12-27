import { ServerResponse } from 'http';
import { PostController, LogoutController } from '../controllers';
import { handleNotFound } from '../controllers/utils';
import type { AuthorizedIncomingMessage } from '../types';

export const router = (req: AuthorizedIncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/posts':
      if (req.user != null) {
        PostController(req, res);
      } else {
        handleNotFound(req, res);
      }
      break;
    case '/logout':
      LogoutController(req, res);
      break;
    default:
      handleNotFound(req, res);
  }
};
