# pied-piper-client

Admin interface for pied-piper api proxy/cache.

Uses: webpack, babel, generators, vue, vue-router, joi, bootstrap, sse.

## scripts

* `npm start` - serves _dist_ with koa-static, on PORT (default is 8080)
* `npm run dev` - launches webpack dev server on DEV_PORT (default is 3000)
* `npm run build` - builds the frontend into _dist_

## env vars

.env file supported

* `PORT` || 8080
* `API_URL` || 'http://localhost:3100/api',
* `DEV_PORT` || 3000

## TODO

- [ ] authentication (?)
- [ ] error messages, notification
- [ ] filter fields for proxied resources (client side)
