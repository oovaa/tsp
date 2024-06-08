import Koa from 'koa';
import type { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import Router from 'koa-router';
require('colors');

const port = 3000

const app = new Koa()

const router: Router = new Router()

// The selected code snippet appears to be written in TypeScript and is part of a Node.js
//  application using the npm package manager. Let's break down what this code does.

// The code starts by using the app.use function, which is a middleware function in the
//  Express.js framework. Middleware functions are functions that have access to the request and response objects, as well as the next function, which is used to pass control to the next middleware function in the stack.

// In this specific middleware function, the code defines an asynchronous function that
//  takes in two parameters: ctx and next. ctx represents the context object, which contains information about the current request and response. next is a function that is called to pass control to the next middleware function.

// Inside the middleware function, the code sets the ctx.body property to the string 'hi there'.
//  This sets the response body to 'hi there', which will be sent back to the client.

// After setting the response body, the code calls await next(). This is where 
// the control is passed to the next middleware function in the stack. The await keyword is used because the next function might be asynchronous.

// Once the control returns from the next middleware function, the code calculates the time 
// it took for the request to be processed by subtracting the current time (Date.now()) from the start time, which was recorded before calling next(). The result is stored in the ms variable.

// Finally, the code sets the X-Response-Time header of the response using the ctx.set
//  function. The header value is set to ${ms} ms, which represents the time taken for the request in milliseconds.

// Overall, this middleware function sets the response body, passes control to the next
//  middleware function, and calculates and sets the response time header. It is a common pattern to measure the response time of requests in web applications.



app.use(async (ctx, next) => {
    const start = Date.now()
    ctx.body = 'hi there'
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms} ms`)
})

// Route handler
router.get('/', async (ctx) => {
    console.log('body', ctx.body);
    ctx.body = 'hoo there'
    console.log('body', ctx.body);

})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port).on('listening',
    () => console.log(`server on port http://localhost:${port || 3000}`)
)
