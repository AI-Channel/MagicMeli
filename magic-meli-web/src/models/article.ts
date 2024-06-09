export interface ArticleMeta {
  id: number
  title: string
  author: string
  category: string
  summary: string
  tags: string[]
  updateTime: string
  isPublished: boolean
  isDeleted: boolean
}

export interface Article extends ArticleMeta {
  content: string
}

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
  id: number
}

export const emptyArticle: Article = {
  id: 0,
  title: '',
  author: '',
  category: '',
  summary: '',
  tags: [],
  updateTime: new Date().toISOString(),
  isDeleted: false,
  isPublished: false,
  content: ''
}
