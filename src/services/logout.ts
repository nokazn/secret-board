import { IncomingMessage, ServerResponse } from 'http';

export const logout = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ログアウトしました。');
};
