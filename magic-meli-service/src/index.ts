import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { ArticleController } from './modules/article/article.controller'
import { imageController } from './modules/image/image.controller'
import { idGenerate } from './libs/libs'

const app = new Elysia().use(swagger()).get('/test',()=>idGenerate()).use(ArticleController).use(imageController).listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
