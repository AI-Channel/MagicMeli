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
  .delete(
    '/:id',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.deleteArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .put(
    '/:id/revert',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.revertArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .delete(
    '/:id/hard-delete',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.hardDelArticleById(id)
    },
    {
      params: t.Object({ id: t.Numeric() })
    }
  )
  .get('/list', ({ ArticleService }) => {
    return ArticleService.getAriticleList()
  })
  .get('deleted-article-list', ({ ArticleService }) => {
    return ArticleService.getDeletedArticleList()
  })
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
