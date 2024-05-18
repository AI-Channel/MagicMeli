import type { Article, ArticleMeta } from '@/models/article'
import instance from './axiosInstance'
import { union } from '../scripts/libs'

export async function getArticleById(id: number): Promise<Article> {
  const response = await instance.get<Article>(`/article/${id}`)
  return response.data
}

export async function getArticleList(): Promise<ArticleMeta[]> {
  const response = await instance.get<ArticleMeta[]>('/article/article-list')
  return response.data
}

export async function getDelArticleList(): Promise<ArticleMeta[]> {
  const response = await instance.get<ArticleMeta[]>('/article/deleted-article-list')
  return response.data
}

export async function delArticleById(id: number): Promise<Article> {
  const response = await instance.delete<Article>(`/article/${id}`)
  return response.data
}

export async function newArticle(params: Article): Promise<Article> {
  const response = await instance.post<Article>('/article/new', params)
  return response.data
}

export async function updateArticle(params: Article): Promise<Article> {
  const response = await instance.put<Article>('/article/update', params)
  return response.data
}

export async function hardDelArticleById(id: number): Promise<Article> {
  const response = await instance.delete<Article>(`/article/${id}/hard-delete`)
  return response.data
}

export async function revertArticleById(id: number): Promise<Article> {
  const response = await instance.get<Article>(`/revert/${id}`)
  return response.data
}

export async function getAllTags() {
  const articleList = await getArticleList()
  let tags: Set<string> = new Set()
  for (const article of articleList) {
    tags = union(tags, new Set(article.tags))
  }
  return [...tags]
}
