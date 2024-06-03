// /src/app.js

import Koa from 'koa'
import Router from 'koa-router'
import path from 'path'

const app = new Koa()
const router = new Router()

// Middleware to handle routes and allowed methods
app.use(router.routes()).use(router.allowedMethods())

// Default route
app.use(async (ctx) => {
  ctx.body = { message: 'hi omar' }
})

router.get('/test', (ctx) => {
  ctx.body = 'hi test'
})

// Error handling middleware
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
