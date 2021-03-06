import http from 'http';
import * as auth from 'http-auth';
import { router } from './lib/router';
import { checkConfig, PORT } from './constants';
import type { AuthorizedIncomingMessage } from './types';

checkConfig();

const basic = auth.basic({
  realm: 'Enter username and passpord.',
  file: './src/users.htpasswd',
});

const server = http
  .createServer(
    basic.check((req, res) => {
      router(req as AuthorizedIncomingMessage, res);
    }),
  )
  .on('error', (err: Error) => {
    console.error('Server Error', err);
  })
  .on('clientError', (err: Error) => {
    console.error('Client Error', err);
  });

const port = PORT || 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
