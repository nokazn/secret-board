import { ServerResponse } from 'http';
import pug from 'pug';
import dayjs from 'dayjs';

import Post from '../models/Post';
import { addTrackingCookie, handleBadRequest, handleRedirectPosts, handlePost } from './utils';
import type { AuthorizedIncomingMessage } from '../types';

export const PostController = (req: AuthorizedIncomingMessage, res: ServerResponse) => {
  const trackingCookie = addTrackingCookie(req, res);

  switch (req.method) {
    case 'GET':
      Post.then((post) => post.findAll({ order: [['id', 'DESC']] })).then((posts) => {
        const formattedPosts = posts.map((p) => ({
          ...p.get(),
          content: p.getDataValue('content').replace(/\+/g, ' '),
          formattedCreatedAt: dayjs(p.get('createdAt') as string).format(
            'YYYY年M月D日 H時mm分ss秒',
          ),
        }));
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.end(
          pug.renderFile('src/views/posts.pug', {
            posts: formattedPosts,
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
            content: content ?? '',
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
        if (req.user === post?.getDataValue('postedBy')) {
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
