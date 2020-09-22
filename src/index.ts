import http from 'http';
// @ts-ignore
import * as auth from 'http-auth';
import { router } from './lib/router';

const basic = auth.basic({
  realm: 'Enter username and passpord.',
  file: './src/users.htpasswd',
});

console.log(basic);
const server = http
  .createServer(
    basic.check((req: http.IncomingMessage, res: http.ServerResponse) => {
      router(req, res);
    }),
  )
  .on('error', (err: Error) => {
    console.error('Server Error', err);
  })
  .on('clientError', (err: Error) => {
    console.error('Client Error', err);
  });

const port = 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
