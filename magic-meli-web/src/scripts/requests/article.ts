import type {
  ArticleListViewAndLengthResponse,
  ArticleListViewResponse,
  articleStatusHandles,
  ArticleViewRequest,
  ArticleViewResponse,
  listQueryMode
} from '@/models/article'
import { autoToast, union } from '@/scripts/libs'
import instance from './axiosInstance'

export async function getArticleById(id: number): Promise<ArticleViewResponse> {
  const response = await instance.get<ArticleViewResponse>(`/articles/${id}`)
  return response.data
}

export async function getArticleList(
  status: listQueryMode,
  page: number,
  searchPrompt?: string
): Promise<ArticleListViewAndLengthResponse> {
  const response = await instance.get<ArticleListViewAndLengthResponse>(`/articles`, {
    params: { queryMode: status, page: page, searchPrompt: searchPrompt }
  })
  return response.data
}

export async function updateArticleStatusById(id: number, status: articleStatusHandles): Promise<ArticleViewResponse> {
  const response = await instance.put<ArticleViewResponse>(`/articles/${id}/status`, { method: status })
  return response.data
}

export async function newArticle(payload: ArticleViewRequest): Promise<ArticleViewResponse> {
  if (payload.title.length < 1 || payload.category.length < 1 || payload.content.length < 1) {
    autoToast('文章标题，分类，内容字段不能为空！', 'error')
    throw new Error('Invalid meta info')
  }
  const response = await instance.post<ArticleViewResponse>('/articles', payload)
  return response.data
}

export async function updateArticleById(id: number, params: ArticleViewRequest): Promise<ArticleViewResponse> {
  if (params.title.length < 1 || params.category.length < 1 || params.content.length < 1) {
    autoToast('文章标题，分类，内容字段不能为空！', 'error')
    throw new Error('Invalid meta info')
  }
  const response = await instance.put<ArticleViewResponse>(`/articles/${id}`, params)
  return response.data
}

export async function hardDelArticleById(id: number): Promise<ArticleViewResponse> {
  const response = await instance.delete<ArticleViewResponse>(`/articles/${id}`)
  return response.data
}

export async function clearArticlesRecycleBin(): Promise<ArticleViewResponse> {
  const response = await instance.delete<ArticleViewResponse>(`/articles`)
  return response.data
}

export async function getAllTagsByArticleList(articleList: ArticleListViewResponse[]) {
  let tags: Set<string> = new Set()
  for (const article of articleList) {
    tags = union(tags, new Set(article.tags))
  }
  return [...tags]
}
