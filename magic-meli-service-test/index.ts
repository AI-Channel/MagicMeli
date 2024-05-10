import swagger from '@elysiajs/swagger'
import { Elysia, t } from 'elysia'
import { ArticleController } from './controllers'
import { ArticleDto } from './models/article'

const article = new ArticleController()

const app = new Elysia()
  .use(swagger())
  .get('/', () => 'test')
  .get('/article/:id', ({ params: { id } }) => article.getArticleById(id), {
    params: t.Object({ id: t.Numeric() })
  })
  .get('/articles', () => article.getAriticleList())
  .post('/article/new', ({ body: newArticle }) => article.insertArticle(newArticle), {
    body: t.Object({
      title: t.String(),
      summary: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      isPublised: t.Boolean()
    })
  })
  .delete('/article/:id', ({ params: { id } }) => article.deleteArticleById(id), {
    params: t.Object({ id: t.Numeric() })
  })
  .put('/revert/:id', ({ params: { id } }) => article.revertArticleById(id), {
    params: t.Object({ id: t.Numeric() })
  })
  .put('/article/update', ({ body: newArticle }) => article.updateArticle(newArticle), {
    body: t.Object({
      id: t.Number(),
      summary: t.String(),
      title: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      isPublished: t.Boolean()
    })
  })
  .delete('/article/:id/hard-delete', ({ params: { id } }) => article.hardDelArticleById(id), {
    params: t.Object({ id: t.Numeric() })
  })
  .listen(5939)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
