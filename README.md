# typescript-starter

## setting environmental variables

```bash
$ echo PORT=3000 > .env
```

## scripts

### format

```bash
$ yarn format
```

### lint

```bash
$ yarn lint

# auto fix
$ yarn lint:fix
```

### dev

```bash
$ yarn dev

# hot reload
$ yarn dev:watch
```

### test

```bash
$ yarn test
```

### build

```bash
$ yarn build
```

### start

```bash
$ yarn start
$ curl localhost:8000
Hello World!
```

## deploy to Heroku

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false PORT=8000
```

また、`SALT` に適切な長さの文字列を設定しておく。

```bash
heroku config:set SALT=abcdefghijklmopqrstuvwxyz1234567890abcdefghijklmopqrstuvwxyz1234567890abcdefghijklmopqrstuvwxyz1234567890
```

## License

MIT
