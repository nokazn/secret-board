import { IncomingMessage, ServerResponse } from 'http';

export const notFound = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ページが見つかりません。');
};
