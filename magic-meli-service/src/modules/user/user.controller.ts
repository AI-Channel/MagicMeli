import bearer from '@elysiajs/bearer'
import jwt from '@elysiajs/jwt'
import Elysia, { error, t } from 'elysia'
import { jwtTokenSecret } from '../../libs/libs'
import { userModel, usersLevelStr, UserVerifyInfoDto } from './user.model'
import { UserService } from './user.service'

export const userController = new Elysia({ prefix: 'users', detail: { tags: ['Users'] } })
  .decorate({ UserService: new UserService() })
  .use(bearer())
  .use(
    jwt({
      name: 'jwt',
      alg: 'HS256',
      iss: 'MagicMeli.icu',
      secret: jwtTokenSecret,
      exp: '30min',
      nbf: '0min',
      schema: t.Object({ userId: t.String(), email: t.String({ format: 'email' }), level: t.Enum(usersLevelStr) })
    })
  )
  .use(userModel)
  .get('', ({ UserService }) => {
    return UserService.getUsersList()
  })
  .group('/:userId', { params: t.Object({ userId: t.String() }) }, (app) =>
    app
      .get('', async ({ UserService, params: { userId } }) => {
        return UserService.getUserInfoById(userId, 'public')
      })
      .put(
        '',
        async ({ UserService, params: { userId }, body: user, jwt, bearer }) => {
          const newUserVerifyInfo: UserVerifyInfoDto = UserService.modifyUserInfo(userId, user)
          const tokenInfo = await jwt.verify(bearer)
          if (tokenInfo) if (tokenInfo.userId != userId) return error(403, 'Forbidden')
          return await jwt.sign(newUserVerifyInfo)
        },
        {
          body: 'user.update',
          async beforeHandle({ bearer, jwt }) {
            if (!bearer || !(await jwt.verify(bearer))) {
              return error(401, 'Unauthorized')
            }
          }
        }
      )
  )
  .get(
    '/refresh',
    async ({ bearer, jwt }) => {
      const tokenVerified = await jwt.verify(bearer)
      if (tokenVerified)
        return await jwt.sign({ userId: tokenVerified.userId, email: tokenVerified.email, level: tokenVerified.level })
    },
    {
      async beforeHandle({ bearer, jwt }) {
        if (!bearer || !(await jwt.verify(bearer))) {
          return error(401, 'Unauthorized')
        }
      }
    }
  )
  // .post(
  //   '/register',
  //   async ({ UserService, jwt, body: newUser }) => {
  //     const newUserInfo = UserService.register(newUser)
  //     if (!newUserInfo) return error(400, 'Bad Request')
  //     else return await jwt.sign(newUserInfo)
  //   },
  //   { body: 'user.register' }
  // )
  .post(
    '/login',
    async ({ UserService, jwt, body: user }) => {
      const userVerifyInfo = UserService.login(user)
      if (!userVerifyInfo) {
        return error(401, 'Unauthorized')
      } else return await jwt.sign(userVerifyInfo)
    },
    { body: 'user.login' }
  )
