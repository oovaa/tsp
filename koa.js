import Koa from 'koa'
import Router from 'koa-router'
import 'colors'
const app = new Koa()
const router = new Router()

// Define your routes here
router.get('/', (ctx) => {
  ctx.body = 'Hello, world!'
})

router.get('/about', (ctx) => {
  ctx.body = 'This is the about page'
})

// Mount the router middleware
app.use(router.routes()).use(router.allowedMethods())

// Start the server
const port = 3000
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`.blue.bold)
})
