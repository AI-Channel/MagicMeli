export interface ArticleMeta {
  id: number
  title: string
  author?: string
  category?: string
  summary?: string
  tags?: string[]
  updateTime?: string
  isPublished?: boolean
  isDeleted?: boolean
}

export interface Article extends ArticleMeta {
  content: string
}
