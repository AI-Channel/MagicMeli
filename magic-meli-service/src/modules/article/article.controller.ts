import bearer from '@elysiajs/bearer'
import jwt from '@elysiajs/jwt'
import Elysia, { error, t } from 'elysia'
import { jwtTokenSecret } from '../../libs/libs'
import { usersLevelStr } from '../user/user.model'
import { UserService } from '../user/user.service'
import { ArticleModel, articleStatusHandles, listQueryMode } from './article.model'
import { ArticleService } from './article.service'

export const ArticleController = new Elysia({ prefix: '/articles', detail: { tags: ['Articles'] } })
  .use(ArticleModel)
  .use(bearer())
  .use(
    jwt({
      alg: 'HS256',
      name: 'jwt',
      iss: 'MagicMeli.icu',
      secret: jwtTokenSecret,
      exp: '30min',
      nbf: '0min',
      schema: t.Object({ userId: t.String(), email: t.String({ format: 'email' }), level: t.Enum(usersLevelStr) })
    })
  )
  .decorate({ ArticleService: new ArticleService(), UserService: new UserService() })
  .get(
    '/:id',
    ({ ArticleService, params: { id } }) => {
      return ArticleService.getArticleById(id)
    },
    {
      params: t.Object({
        id: t.Numeric({ error: 'Invalid article id' })
      }),
      detail: { description: 'Get an article by article id' }
    }
  )
  .group(
    '/:id',
    {
      params: t.Object({
        id: t.Numeric({ error: 'Invalid article id' })
      }),
      async beforeHandle({ bearer, jwt }) {
        if (!bearer || !(await jwt.verify(bearer))) {
          return error(401, 'Unauthorized')
        }
      }
    },
    (app) =>
      app
        .resolve(async ({ bearer, jwt }) => ({
          tokenVerified: await jwt.verify(bearer)
        }))
        .put(
          '',
          async ({ ArticleService, params: { id }, body: newArticle }) => {
            return ArticleService.updateArticle(id, newArticle)
          },
          {
            body: 'articles.view',
            detail: { description: 'Modify an article by article id' },
            beforeHandle({ body, tokenVerified }) {
              if (body.content.length < 1 && body.isPublished == true) return error(400, 'Bad Request')
              if (tokenVerified && tokenVerified.userId != body.author) return error(403, 'Forbidden')
            }
          }
        )
        .put(
          '/status',
          async ({ ArticleService, params: { id }, body: methods }) => {
            return ArticleService.updateArticleStatusById(id, methods.method)
          },
          {
            body: t.Object({
              method: t.Enum(articleStatusHandles, { description: 'Must in {delete, revert, publish, unpublish}' })
            }),
            detail: {
              description: "Update an article's status by article id, Delete, revert, publish or unpublish an article"
            }
          }
        )
        .put(
          '/permission',
          ({ ArticleService, params: { id }, body: permissionLevel }) => {
            return ArticleService.updatePermissionById(id, permissionLevel.permission)
          },
          {
            body: t.Object({ permission: t.Enum(usersLevelStr) }),
            detail: {
              description: "Update an article's permission level"
            }
          }
        )
        .delete(
          '',
          async ({ ArticleService, params: { id } }) => {
            return ArticleService.hardDelArticleById(id)
          },
          {
            detail: {
              description: 'Delete an article, *Hard Delete*'
            }
          }
        )
  )
  .get(
    '',
    async ({ ArticleService, query: { queryMode }, bearer, jwt }) => {
      const articleList = ArticleService.getArticleList(queryMode)
      const tokenVerified = await jwt.verify(bearer)
      if (queryMode == 'published') return articleList
      else if (queryMode == 'deleted' || queryMode == 'draft')
        if (articleList && tokenVerified) return articleList.filter((item) => item.author == tokenVerified.userId)
    },
    {
      query: t.Object({
        queryMode: t.Enum(listQueryMode, {
          error: 'Invalid query status',
          description: 'Must in {published, deleted, draft}',
          default: 'published'
        })
      }),
      detail: { description: 'Get articles as a list' },
      async beforeHandle({ query: { queryMode }, bearer, jwt }) {
        if (queryMode != 'published' && (!bearer || !(await jwt.verify(bearer)))) {
          return error(401, 'Unauthorized')
        }
      }
    }
  )
  .post(
    '',
    async ({ ArticleService, body: newArticle, set }) => {
      set.status = 201
      return ArticleService.insertArticle(newArticle)
    },
    {
      body: 'articles.view',
      detail: { description: 'Create a new article' },
      async beforeHandle({ bearer, jwt, body }) {
        const tokenVerified = await jwt.verify(bearer)
        if (!bearer || !tokenVerified) {
          return error(401, 'Unauthorized')
        }
        if (body.content.length < 1 && body.isPublished == true) return error(400, 'Bad Request')
        if (tokenVerified.userId != body.author) return error(403, 'Forbidden')
      }
    }
  )
