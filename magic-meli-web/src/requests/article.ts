import type {
  ArticleListViewResponse,
  articleStatusHandles,
  ArticleViewRequest,
  ArticleViewResponse,
  listQueryMode
} from '@/models/article'
import { toast } from 'vue3-toastify'
import { union } from '@/scripts/libs'
import instance from './axiosInstance'

export async function getArticleById(id: number): Promise<ArticleViewResponse> {
  const response = await instance.get<ArticleViewResponse>(`/articles/${id}`)
  return response.data
}

export async function getArticleListByStatus(status: listQueryMode): Promise<ArticleListViewResponse[]> {
  const response = await instance.get<ArticleListViewResponse[]>(`/articles?queryMode=${status}`)
  return response.data
}

export async function updateArticleStatusById(id: number, status: articleStatusHandles): Promise<ArticleViewResponse> {
  const response = await instance.put<ArticleViewResponse>(`/articles/${id}/status`, { method: status })
  return response.data
}

export async function newArticle(payload: ArticleViewRequest): Promise<ArticleViewResponse> {
  if (
    payload.title.length < 1 ||
    payload.author.length < 1 ||
    payload.category.length < 1 ||
    payload.content.length < 1
  ) {
    toast.error('文章标题，作者，分类，内容字段不能为空！', { position: toast.POSITION.TOP_CENTER })
    throw new Error('文章标题，作者，分类，内容字段不能为空！')
  }
  const response = await instance.post<ArticleViewResponse>('/articles', payload)
  return response.data
}

export async function updateArticleById(id: number, params: ArticleViewRequest): Promise<ArticleViewResponse> {
  if (params.title.length < 1 || params.author.length < 1 || params.category.length < 1 || params.content.length < 1) {
    toast.error('文章标题，作者，分类，内容字段不能为空！', { position: toast.POSITION.TOP_CENTER })
    throw new Error('文章标题，作者，分类，内容字段不能为空！')
  }
  const response = await instance.put<ArticleViewResponse>(`/articles/${id}`, params)
  return response.data
}

export async function hardDelArticleById(id: number): Promise<ArticleViewResponse> {
  const response = await instance.delete<ArticleViewResponse>(`/articles/${id}`)
  return response.data
}

export async function getAllTagsByArticleList(articleList: ArticleListViewResponse[]) {
  let tags: Set<string> = new Set()
  for (const article of articleList) {
    tags = union(tags, new Set(article.tags))
  }
  return [...tags]
}
