export class CreateArticleDto {
  readonly id: number
  readonly title: string
  readonly author?: string
  readonly category?: string
  readonly summary?: string
  readonly tags?: string[]
  readonly updateTime?: string
  readonly isPublished?: boolean
  readonly isDeleted?: boolean
}
