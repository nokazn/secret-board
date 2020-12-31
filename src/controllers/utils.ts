import { IncomingMessage, ServerResponse } from 'http';
import crypto from 'crypto';
import Cookies from 'cookies';
import { TRACKING_COOKIE_ID, SALT } from '../constants';
import type { AuthorizedIncomingMessage } from '../types';

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

const createValidateHash = (originalId: string, userName: string): string => {
  const sha1sum = crypto.createHash('sha1');
  sha1sum.update(originalId + userName + SALT);
  return sha1sum.digest('hex');
};

/**
 * <originalId>_<originalId + userName をハッシュ化したもの> の形式になっているかチェック
 */
export const isValidTrackingId = (trackingId: string, userName: string): boolean => {
  if (!trackingId || !userName) {
    return false;
  }
  const splitted = trackingId.split('_');
  if (splitted.length !== 2) {
    return false;
  }
  const originalId = splitted[0];
  const requestedHash = splitted[1];
  return createValidateHash(originalId, userName) === requestedHash;
};

/**
 * Cookie に含まれているトラッキングIDが正しければその値を返し、存在しない場合や異常なものである場合には再作成する
 */
export const addTrackingCookie = (req: AuthorizedIncomingMessage, res: ServerResponse): string => {
  const cookies = new Cookies(req, res);
  const requestedTrackingId = cookies.get(TRACKING_COOKIE_ID);
  // 不正な tracking id は再生成
  if (requestedTrackingId && isValidTrackingId(requestedTrackingId, req.user)) {
    return requestedTrackingId;
  }
  const originalId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
  const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const trackingId = `${originalId}_${createValidateHash(originalId, req.user)}`;
  cookies.set(TRACKING_COOKIE_ID, trackingId, { expires: tomorrow });
  return trackingId;
};

export const handlePost = (name: string, cb: (content: string) => any) => (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  switch (req.method) {
    case 'POST':
      // eslint-disable-next-line no-case-declarations
      const body: Uint8Array[] = [];
      req
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          const data = Buffer.concat(body).toString();
          const [, content] = decodeURIComponent(data).split(`${name}=`);
          cb(content);
        });
      break;

    default:
      handleBadRequest(req, res);
      break;
  }
};
