import Koa from 'koa';
import type { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import Router from 'koa-router';
require('colors');

const port = 3000

const app = new Koa()

const router: Router = new Router()

router.get('/', async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: 'hi there' }
})


app.use(router.routes()).use(router.allowedMethods())

app.listen(port).on('listening', () => console.log(`server on port http://localhost:${port || 3000}`)
)
