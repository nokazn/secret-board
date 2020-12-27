import { ServerResponse } from 'http';
import pug from 'pug';

import Post from '../model/Post';
import { addTrackingCookie, handleBadRequest, handleRedirectPosts, handlePost } from './utils';
import { TRACKING_COOKIE_ID } from '../constants';
import type { AuthorizedIncomingMessage } from '../types';

export const PostController = (req: AuthorizedIncomingMessage, res: ServerResponse) => {
  const cookies = addTrackingCookie(req, res);
  const trackingCookie = cookies.get(TRACKING_COOKIE_ID) ?? null;

  switch (req.method) {
    case 'GET':
      Post.then((post) => post.findAll({ order: [['id', 'DESC']] })).then((posts) => {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.end(
          pug.renderFile('./src/views/posts.pug', {
            posts,
            user: req.user,
          }),
        );
        console.info('閲覧されました。', {
          user: req.user,
          trackingCookie,
          remoteAddress: req.connection.remoteAddress,
          userAgent: req.headers['user-agent'],
        });
      });
      break;

    case 'POST':
      handlePost('content', (content) => {
        Post.then((post) =>
          post.create({
            content,
            trackingCookie,
            postedBy: req.user,
          }),
        )
          .then(() => {
            console.info(`投稿されました: ${content}`);
            handleRedirectPosts(req, res);
          })
          .catch((err) => {
            console.error({ err });
          });
      })(req, res);
      break;

    default:
      handleBadRequest(req, res);
  }
};

export const PostDeleteController = (req: AuthorizedIncomingMessage, res: ServerResponse) => {
  handlePost('id', (id) => {
    Post.then((post) => post.findByPk(id))
      .then((post) => {
        // @ts-ignore
        if (req.user === post?.postedBy) {
          return post.destroy();
        }
        return Promise.resolve();
      })
      .then(() => {
        console.info('削除されました。', {
          user: req.user,
          remoteAddress: req.connection.remoteAddress,
          userAgent: req.headers['user-agent'],
        });
        handleRedirectPosts(req, res);
      })
      .catch((err) => {
        console.error(err);
        res.end();
      });
  })(req, res);
};
