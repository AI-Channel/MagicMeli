import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { ArticleController } from './modules/article/article.controller'
import { idGenerate } from './libs/libs'
import cors from '@elysiajs/cors'

const app = new Elysia({ normalize: true })
  .use(swagger())
  .use(cors())
  .get('/test', () => idGenerate())
  .use(ArticleController)
  .listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
