import Elysia, { t } from 'elysia'
import { ArticleModel } from './article.model'
import { ArticleService } from './article.service'

export const ArticleController = new Elysia({ prefix: '/article' })
  .use(ArticleModel)
  .decorate({ ArticleService: new ArticleService() })
  .get('/test', ({ ArticleService }) => {
    return ArticleService.getAllCategories()
  })
  .get(
    '/:id',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.getArticleById(id)
    },
    { params: t.Object({ id: t.Numeric() }) }
  )
  .put(
    '/:id',
    ({ ArticleService, params: { id }, query: { status } }) => {
      return ArticleService.updateArticleStatusById(id, status)
    },
    {
      params: t.Object({ id: t.Numeric() }),
      query: t.Object({ status: t.String() })
    }
  )
  .delete(
    '/:id',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.hardDelArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .get(
    '/list',
    ({ ArticleService, query: { status } }) => {
      return ArticleService.getAriticleList(status)
    },
    { query: t.Object({ status: t.String() }) }
  )
  .post(
    '/new',
    ({ ArticleService, body: newArticle }) => {
      return ArticleService.insertArticle(newArticle)
    },
    {
      body: 'article.new'
    }
  )
  .put(
    '/update',
    ({ ArticleService, body: newArticle }) => {
      return ArticleService.updateArticle(newArticle)
    },
    {
      body: 'article.update'
    }
  )
