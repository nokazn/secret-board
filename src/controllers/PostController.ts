import { IncomingMessage, ServerResponse } from 'http';
import pug from 'pug';
import Post from '../model/Post';
import { handleBadRequest, handleRedirectPosts } from './utils';

export const PostController = (req: IncomingMessage & { user: string }, res: ServerResponse) => {
  switch (req.method) {
    case 'GET':
      Post.then((post) => post.findAll({ order: [['id', 'DESC']] })).then((posts) => {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf8',
        });
        res.end(pug.renderFile('./src/views/posts.pug', { posts }));
      });
      break;

    case 'POST':
      // eslint-disable-next-line no-case-declarations
      const body: Uint8Array[] = [];
      req
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          const data = Buffer.concat(body).toString();
          // content=value の形式でわたってくる
          const content = decodeURIComponent(data).split('content=')[1];
          console.info(`投稿されました: ${content}`);
          Post.then((post) =>
            post.create({
              content,
              trackingCookie: null,
              postedBy: req.user,
            }),
          )
            .then(() => {
              handleRedirectPosts(req, res);
            })
            .catch((err) => {
              console.error({ err });
            });
        });
      break;

    default:
      handleBadRequest(req, res);
  }
};
