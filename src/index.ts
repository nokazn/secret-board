import http from 'http';

const server = http
  .createServer((_req, res) => {
    res.end('hi');
  })
  .on('error', (err) => {
    console.error('Server Error', err);
  })
  .on('clientError', (err: Error) => {
    console.error('Client Error', err);
  });

const port = 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
