import { IncomingMessage, ServerResponse } from 'http';
import pug from 'pug';

export const LogoutController = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8',
  });
  res.end(pug.renderFile('./src/views/logout.pug'));
};
