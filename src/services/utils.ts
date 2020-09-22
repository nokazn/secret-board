import * as http from 'http';

export const handleBadRequest = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf8',
  });
  res.end('未対応のメソッドです');
};
