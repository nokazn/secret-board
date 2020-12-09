import { IncomingMessage, ServerResponse } from 'http';
import pug from 'pug';
import Post from '../model/post';
import { handleBadRequest } from './utils';

const contents: string[] = [];

const handleRedirectPosts = (_req: IncomingMessage, res: ServerResponse) => {
  // See Other
  res.writeHead(303, {
    Location: '/posts',
  });
  res.end();
};

export const posts = (req: IncomingMessage & { user?: string }, res: ServerResponse) => {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8',
      });
      res.end(pug.renderFile('./src/views/posts.pug', { contents }));
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
          contents.push(content);
          console.info(`投稿されました: ${content}`);
          console.info(`投稿された全内容: ${contents}`);
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
