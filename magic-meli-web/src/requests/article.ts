import type { Article, ArticleMeta, ArticleUpdateDto } from '@/models/article'
import instance from './axiosInstance'
import { union } from '../scripts/libs'

export async function getArticleById(id: number): Promise<Article> {
  const response = await instance.get<Article>(`/article/${id}`)
  return response.data
}

export async function getArticleListByStatus(status: string): Promise<ArticleMeta[]> {
  const response = await instance.get<ArticleMeta[]>(`/article/list?status=${status}`)
  return response.data
}

export async function updateArticleStatusById(id: number, status: string): Promise<Article> {
  const response = await instance.put<Article>(`/article/${id}?status=${status}`)
  return response.data
}

export async function newArticle(params: Article): Promise<Article> {
  if (params.title == '' || params.author == '' || params.category == '' || params.content == '') {
    alert('文章标题，作者，分类，内容字段不能为空！')
    throw '文章标题，作者，分类，内容字段不能为空！'
  }
  const response = await instance.post<Article>('/article/new', params)
  return response.data
}

export async function updateArticle(params: ArticleUpdateDto): Promise<Article> {
  if (params.title == '' || params.author == '' || params.category == '' || params.content == '') {
    alert('文章标题，作者，分类，内容字段不能为空！')
    throw '文章标题，作者，分类，内容字段不能为空！'
  }
  const response = await instance.put<Article>('/article/update', params)
  return response.data
}

export async function hardDelArticleById(id: number): Promise<Article> {
  const response = await instance.delete<Article>(`/article/${id}`)
  return response.data
}

export async function getAllTags() {
  const articleList = await getArticleListByStatus('article')
  let tags: Set<string> = new Set()
  for (const article of articleList) {
    tags = union(tags, new Set(article.tags))
  }
  return [...tags]
}
