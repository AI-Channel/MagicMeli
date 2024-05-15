import Elysia, { t } from 'elysia'
import { ArticleModel } from './article.model'
import { ArticleService } from './article.service'

export const ArticleController = new Elysia({ prefix: '/article' })
  .use(ArticleModel)
  .decorate({ Service: new ArticleService() })
  .get(
    '/:id',
    ({ Service, params: { id } }) => {
      return Service.getArticleById(id)
    },
    { params: t.Object({ id: t.Numeric() }) }
  )
  .delete(
    '/:id',
    ({ Service, params: { id } }) => {
      return Service.deleteArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .put(
    '/:id/revert',
    ({ Service, params: { id } }) => {
      return Service.revertArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .delete(
    '/:id/hard-delete',
    ({ Service, params: { id } }) => {
      return Service.hardDelArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .get('/list', ({ Service }) => {
    return Service.getAriticleList()
  })
  .post(
    '/new',
    ({ Service, body: newArticle }) => {
      return Service.insertArticle(newArticle)
    },
    {
      body: 'article.new'
    }
  )
  .put(
    '/update',
    ({ Service, body: newArticle }) => {
      return Service.updateArticle(newArticle)
    },
    {
      body: 'article.update'
    }
  )
