import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { ArticleController } from './modules/article/article.controller'

const app = new Elysia().use(swagger()).use(ArticleController).listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
