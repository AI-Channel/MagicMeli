import Elysia, { t } from 'elysia'

export enum usersLevelNum {
  guest,
  user,
  editor,
  admin
}

export enum usersLevelStr {
  guest = 'guest',
  user = 'user',
  editor = 'editor',
  admin = 'admin'
}

export interface UserEntity {
  id: string
  userId: string
  username: string
  password: string
  email: string
  about: string
  level: usersLevelNum
}

export interface UserPublicInfoDto {
  userId: string
  username: string
  email: string
  about: string
  level: usersLevelStr
}

export interface UserVerifyInfoDto {
  userId: string
  email: string
  level: usersLevelStr
}

export interface UserRegisterDto {
  userId: string
  username: string
  password: string
  email: string
}

export interface UserLoginDto {
  userId: string
  password: string
}

export interface UserUpdateDto {
  userId: string
  username: string
  password: string
  email: string
  about: string
}

export const userModel = new Elysia().model({
  'user.login': t.Object({
    userId: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    password: t.String({ minLength: 6, maxLength: 18, error: 'Invalid password!' })
  }),
  'user.register': t.Object({
    userId: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    username: t.String({ minLength: 4, maxLength: 20, error: 'Invalid username!' }),
    password: t.String({ minLength: 6, maxLength: 18, error: 'Invalid password!' }),
    email: t.String({ format: 'email', error: 'invalid email' })
  }),
  'user.verify': t.Object({
    userId: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    email: t.String({ format: 'email', error: 'invalid email' }),
    level: t.Enum(usersLevelStr)
  }),
  'user.update': t.Object({
    userId: t.String({ minLength: 4, maxLength: 20, error: 'Invalid id!' }),
    username: t.String({ minLength: 4, maxLength: 20, error: 'Invalid username!' }),
    password: t.String({ minLength: 6, maxLength: 18, error: 'Invalid password!' }),
    email: t.String({ format: 'email', error: 'invalid email' }),
    about: t.String()
  })
})
