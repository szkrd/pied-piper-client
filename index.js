const serve = require('koa-static')
const koa = require('koa')
const app = koa()
const port = process.env.PORT || 8080

app.use(serve('./dist'))

app.listen(port, 'localhost')
console.log(`listening on port ${port}`, 'localhost')
