import { usersLevelStr } from './user'

export interface ArticleNewDto {
  title: string
  summary: string
  author: string
  content: string
  category: string
  tags: string[]
  isPublished: boolean
}

export interface ArticleUpdateDto extends ArticleNewDto {
  isDeleted: boolean
}

export interface ArticleListViewRequest {
  title: string
  summary: string
  author: string
  category: string
  tags: string[]
  isPublished: boolean
  permission: usersLevelStr
}

export interface ArticleViewRequest extends ArticleListViewRequest {
  content: string
}

export interface ArticleListViewResponse {
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
export interface ArticleListViewAndLengthResponse {
  articleList: ArticleListViewResponse[]
  articleListLength: number
}

export interface ArticleViewResponse extends ArticleListViewResponse {
  content: string
}

export enum listQueryMode {
  published = 'published',
  deleted = 'deleted',
  draft = 'draft',
  search = 'search'
}

export enum articleStatusHandles {
  delete = 'delete',
  revert = 'revert',
  publish = 'publish',
  unpublish = 'unpublish'
}

export const emptyArticle: ArticleViewResponse = {
  id: 0,
  title: '',
  author: '',
  category: '',
  summary: '',
  tags: [],
  updateTime: new Date().toISOString(),
  isDeleted: false,
  isPublished: false,
  content: '',
  permission: usersLevelStr.guest
}
