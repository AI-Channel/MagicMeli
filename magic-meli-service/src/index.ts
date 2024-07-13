import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { ArticleController } from './modules/article/article.controller'
import { imageController } from './modules/image/image.controller'
import { userController } from './modules/user/user.controller'

const app = new Elysia({ normalize: true })
  .use(
    swagger({
      documentation: {
        info: {
          title: 'A Simple Blog written by vue + typescript as frontend and bun + elysia as backend',
          version: '0.0.1 alpha'
        },
        tags: [
          { name: 'Articles', description: 'Article module of this blog, include create, read, update, delete' },
          {
            name: 'Users',
            description: 'An authentication module of users, include register, login and verification for security'
          }
        ]
      },
      provider: 'scalar'
    })
  )
  .use(cors())
  .use(ArticleController)
  .use(imageController)
  .use(userController)
  .listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
