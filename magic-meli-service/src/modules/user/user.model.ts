import Elysia, { t } from 'elysia'

export interface UserEntity {
  id: string
  username: string
  password: string
  email: string
  about: string
  class: string
}
export interface UserPublicInfoDto {
  id: string
  username: string
  about: string
  class: string
}
export interface UserVerifyInfoDto {
  id: string
  email: string
  class: string
}
export const userModel = new Elysia().model({
  'user.login': t.Object({
    id: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    password: t.String({ minLength: 6, maxLength: 18, error: 'Invalid password!' })
  }),
  'user.register': t.Object({
    id: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    username: t.String({ minLength: 4, maxLength: 20, error: 'Invalid username!' }),
    password: t.String({ minLength: 6, maxLength: 18, error: 'Invalid password!' }),
    email: t.String({ format: 'email', error: 'invalid email' })
  }),
  'user.verify': t.Object({
    id: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    email: t.String({ format: 'email', error: 'invalid email' }),
    class: t.String()
  })
})
