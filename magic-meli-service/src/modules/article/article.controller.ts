import Elysia, { error, t } from 'elysia'
import { ArticleModel } from './article.model'
import { ArticleService } from './article.service'
import { jwtTokenSecret } from '../../libs/libs'
import jwt from '@elysiajs/jwt'

export const ArticleController = new Elysia({ prefix: '/article' })
  .use(ArticleModel)
  .use(jwt({ name: 'jwt', secret: jwtTokenSecret, exp: '30min', schema: t.Object({ id: t.String(), password: t.String() }) }))
  .decorate({ ArticleService: new ArticleService() })
  .get(
    '/:id',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.getArticleById(id)
    },
    { params: t.Object({ id: t.Numeric({ error: 'Invalid article id' }) }) }
  )
  .put(
    '/:id',
    async ({ ArticleService, jwt, params: { id }, query: { status }, headers: headers }) => {
      const tokenVerified = await jwt.verify(headers.authorization)
      if (!tokenVerified) return error(401, 'Unauthorized')
      return ArticleService.updateArticleStatusById(id, status)
    },
    {
      params: t.Object({ id: t.Numeric({ error: 'Invalid article id' }) }),
      query: t.Object({ status: t.String({ error: 'Invalid query status' }) }),
      headers: t.Object({ authorization: t.String() })
    }
  )
  .delete(
    '/:id',
    async ({ ArticleService, jwt, params: { id }, headers: headers }) => {
      const tokenVerified = await jwt.verify(headers.authorization)
      if (!tokenVerified) return error(401, 'Unauthorized')
      return ArticleService.hardDelArticleById(id)
    },
    {
      headers: t.Object({ authorization: t.String() }),
      params: t.Object({ id: t.Numeric({ error: 'Invalid article id' }) })
    }
  )
  .get(
    '/list',
    ({ ArticleService, query: { status } }) => {
      return ArticleService.getAriticleList(status)
    },
    { query: t.Object({ status: t.String({ error: 'Invalid query status' }) }) }
  )
  .post(
    '/new',
    async ({ ArticleService, jwt, error, body: newArticle, headers: headers }) => {
      const tokenVerified = await jwt.verify(headers.authorization)
      if (!tokenVerified) return error(401, 'Unauthorized')
      else return ArticleService.insertArticle(newArticle)
    },
    {
      headers: t.Object({ authorization: t.String() }),
      body: 'article.new'
    }
  )
  .put(
    '/update',
    async ({ ArticleService, jwt, headers: headers, body: newArticle }) => {
      const tokenVerified = await jwt.verify(headers.authorization)
      if (!tokenVerified) return error(401, 'Unauthorized')
      else return ArticleService.updateArticle(newArticle)
    },
    {
      headers: t.Object({ authorization: t.String() }),
      body: 'article.update'
    }
  )
