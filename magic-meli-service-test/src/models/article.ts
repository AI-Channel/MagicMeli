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
export interface ArticleMetaDto {
  id?: number
  title: string
  author: string
  summary?: string
  updateTime?: string
  tags?: string[]
  category: string
  isDeleted?: boolean
  isPublished?: boolean
}
export interface ArticleDto extends ArticleMetaDto {
  content: string
}
