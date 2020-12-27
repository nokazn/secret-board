import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'cookies';
import { TRACKING_COOKIE_ID } from '../constants';

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

export const handleLogout = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ログアウトしました。');
};

export const handleNotFound = (_req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8',
  });
  res.end('ページが見つかりません。');
};

export const addTrackingCookie = (req: IncomingMessage, res: ServerResponse) => {
  const cookies = new Cookies(req, res);
  if (!cookies.get(TRACKING_COOKIE_ID)) {
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
    cookies.set(TRACKING_COOKIE_ID, id.toString(), { expires: tomorrow });
  }

  return cookies;
};
