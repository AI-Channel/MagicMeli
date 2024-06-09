import Elysia, { error, t } from 'elysia'
import { userModel } from './user.model'
import { UserService } from './user.service'
import { jwtTokenSecret } from '../../libs/libs'
import jwt from '@elysiajs/jwt'

export const userController = new Elysia({ prefix: 'user' })
  .decorate({ UserService: new UserService() })
  .use(
    jwt({
      name: 'jwt',
      iss: 'MagicMeli.moe',
      secret: jwtTokenSecret,
      exp: '30min',
      schema: t.Object({ id: t.String(), email: t.String({ format: 'email' }), class: t.String() })
    })
  )
  .use(userModel)
  .get(
    '/:id',
    ({ UserService, jwt, headers: headers, params: { id } }) => {
      if (!jwt.verify(headers.authorization)) return error(401, 'Unauthorized')
      return UserService.getUserInfoById(id, 'public')
    },
    { headers: t.Object({ authorization: t.String() }), params: t.Object({ id: t.String() }) }
  )
  .post(
    '/register',
    ({ UserService, jwt, body: newUser }) => {
      const newUserInfo = UserService.register(newUser)
      if (!newUserInfo) return error(400, 'Bad Request')
      else return jwt.sign(newUserInfo)
    },
    { body: 'user.register' }
  )
  .post(
    '/login',
    ({ UserService, jwt, body: user }) => {
      const userVerifyInfo = UserService.login(user)
      if (typeof userVerifyInfo == 'string') {
        console.warn(userVerifyInfo)
        return error(400, 'Bad Request')
      } else if (!userVerifyInfo) {
        return error(401, 'Unauthorized')
      } else return jwt.sign(userVerifyInfo)
    },
    { body: 'user.login' }
  )
  .get(
    '/verify',
    async ({ jwt, headers: headers }) => {
      const userInfo = await jwt.verify(headers.authorization)
      if (!userInfo) return error(401, 'Unauthorized')
      return userInfo
    },
    { headers: t.Object({ authorization: t.String() }) }
  )
  .get(
    '/test/verify',
    async ({ jwt, headers: testToken }) => {
      const tokenVerified = await jwt.verify(testToken.authorization)
      if (!tokenVerified) return error(401, 'Unauthorized')
      else return tokenVerified
    },
    { headers: t.Object({ authorization: t.String() }) }
  )
  .post(
    '/test/sign',
    async ({ jwt, body: testInfo }) => {
      const token = await jwt.sign(testInfo)
      return token
    },
    { body: 'user.verify' }
  )
