import Elysia, { t } from 'elysia'
import { usersLevelNum, usersLevelStr } from '../user/user.model'

export interface ArticleListEntity {
  id: number
  title: string
  summary: string
  author: string
  category: string
  isDeleted: boolean
  isPublished: boolean
  updateTime: string
  permission: usersLevelNum
}

export interface ArticleEntity extends ArticleListEntity {
  content: string
}

export interface ArticleListDtoIn {
  title: string
  summary: string
  author: string
  category: string
  tags: string[]
  isPublished: boolean
  permission: usersLevelStr
}

export interface ArticleDtoIn extends ArticleListDtoIn {
  content: string
}

export interface ArticleListDtoOut {
  id: number
  title: string
  summary: string
  author: string
  tags: string[]
  category: string
  isDeleted: boolean
  isPublished: boolean
  permission: usersLevelStr
  updateTime: string
}

export interface ArticleDtoOut extends ArticleListDtoOut {
  content: string
}

export enum listQueryMode {
  published = 'published',
  deleted = 'deleted',
  draft = 'draft'
}

export enum articleStatusHandles {
  delete = 'delete',
  revert = 'revert',
  publish = 'publish',
  unpublish = 'unpublish'
}

export const ArticleModel = new Elysia({ name: 'Model.Article' }).model({
  'articles.view': t.Object(
    {
      title: t.String({ minLength: 1 }),
      summary: t.String(),
      author: t.String({ minLength: 1 }),
      content: t.String(),
      category: t.String(),
      tags: t.Array(t.String()),
      isPublished: t.Boolean(),
      permission: t.Enum(usersLevelStr)
    },
    { error: 'Invalid article creating schema', description: 'Create or update article' }
  )
})
