import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import { ArticleController } from './modules/article/article.controller'
import cors from '@elysiajs/cors'
import { imageController } from './modules/image/image.controller'
import { userController } from './modules/user/user.controller'
import jwt from '@elysiajs/jwt'
import { jwtTokenSecret } from './libs/libs'

const app = new Elysia({ normalize: true })
  .use(jwt({ name: 'jwt', secret: jwtTokenSecret, exp: '30min', schema: t.Object({ id: t.String(), password: t.String() }) }))
  .use(swagger())
  .use(cors())
  .use(ArticleController)
  .use(imageController)
  .use(userController)
  .listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
