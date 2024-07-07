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
      const article = ArticleService.getArticleById(id)
      return article
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
        .resolve(async ({ bearer, jwt }) => {
          const tokenVerified = await jwt.verify(bearer)
          return {
            tokenVerified
          }
        })
        .put(
          '',
          async ({ ArticleService, params: { id }, body: newArticle }) => {
            return ArticleService.updateArticle(id, newArticle)
          },
          {
            body: 'articles.view',
            detail: { description: 'Modify an article by article id' }
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
    ({ ArticleService, query: { queryMode } }) => {
      return ArticleService.getAriticleList(queryMode)
    },
    {
      query: t.Object({
        queryMode: t.Enum(listQueryMode, {
          error: 'Invalid query status',
          description: 'Must in {published, deleted, draft}',
          default: 'published'
        })
      }),
      detail: { description: 'Get articles as a list' }
    }
  )
  .post(
    '',
    async ({ ArticleService, body: newArticle, set }) => {
      // let articleIn: ArticleDtoIn = {
      //   title: '',
      //   summary: '',
      //   author: store.authorSecretId,
      //   content: '',
      //   tags: [],
      //   category: '',
      //   isPublished: false,
      //   permission: usersLevelStr.guest
      // }
      // articleIn = Object.assign(articleIn, newArticle)
      set.status = 201
      return ArticleService.insertArticle(newArticle)
    },
    {
      body: 'articles.view',
      detail: { description: 'Create a new article' },
      async beforeHandle({ bearer, jwt }) {
        if (!bearer || !(await jwt.verify(bearer))) {
          return error(401, 'Unauthorized')
        }
      }
    }
  )
