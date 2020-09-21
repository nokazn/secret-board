import { IncomingMessage, ServerResponse } from 'http';

export const posts = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case 'GET':
      res.end('hi');
      break;
    case 'POST':
      // @todo
      break;
    default:
      break;
  }
};
