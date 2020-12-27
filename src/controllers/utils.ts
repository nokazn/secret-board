import { IncomingMessage, ServerResponse } from 'http';

export const handleRedirectPosts = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(303, {
    Location: '/posts',
  });
  res.end();
};

export const handleBadRequest = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf8',
  });
  res.end('未対応のメソッドです');
};

export const handleNotFound = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ページが見つかりません。');
};

export const handleLogout = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ログアウトしました。');
};
