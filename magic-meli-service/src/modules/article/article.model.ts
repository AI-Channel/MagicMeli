import Elysia, { t } from 'elysia'

export interface ArticleMetaEntity {
  id: number
  title: string
  author: string
  summary: string
  updateTime: string
  category: string
  isDeleted: boolean
  isPublished: boolean
}
export interface ArticleEntity extends ArticleMetaEntity {
  content: string
}

export const ArticleModel = new Elysia({ name: 'Model.Article' }).model({
  'article.new': t.Object(
    {
      title: t.String(),
      summary: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      tags: t.Array(t.String()),
      isPublished: t.Boolean()
    },
    { error: 'Invalid article creating schema', description: 'Create an new article' }
  ),
  'article.update': t.Object(
    {
      id: t.Integer(),
      title: t.String(),
      summary: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      tags: t.Array(t.String()),
      isPublished: t.Boolean()
    },
    { error: 'Invalid article updating schema', description: 'Update article already existed' }
  )
})
