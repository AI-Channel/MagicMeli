import type { Article, ArticleMeta, ArticleUpdateDto } from '@/models/article'
import instance from './axiosInstance'
import { union } from '../scripts/libs'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/store'

const userStore = useUserStore()

export async function getArticleById(id: number): Promise<Article> {
  const response = await instance.get<Article>(`/article/${id}`)
  return response.data
}

export async function getArticleListByStatus(status: string): Promise<ArticleMeta[]> {
  const response = await instance.get<ArticleMeta[]>(`/article/list?status=${status}`)
  return response.data
}

export async function updateArticleStatusById(id: number, status: string): Promise<Article> {
  const response = await instance.put<Article>(`/article/${id}?status=${status}`, { headers: { Authorization: userStore.token } })
  return response.data
}

export async function newArticle(params: Article): Promise<Article> {
  if (params.title == '' || params.author == '' || params.category == '' || params.content == '') {
    toast.error('文章标题，作者，分类，内容字段不能为空！', { position: toast.POSITION.TOP_CENTER })
    throw '文章标题，作者，分类，内容字段不能为空！'
  }
  const response = await instance.post<Article>('/article/new', params, { headers: { Authorization: userStore.token } })
  return response.data
}

export async function updateArticle(params: ArticleUpdateDto): Promise<Article> {
  if (params.title == '' || params.author == '' || params.category == '' || params.content == '') {
    toast.error('文章标题，作者，分类，内容字段不能为空！', { position: toast.POSITION.TOP_CENTER })
    throw '文章标题，作者，分类，内容字段不能为空！'
  }
  const response = await instance.put<Article>('/article/update', params, { headers: { Authorization: userStore.token } })
  return response.data
}

export async function hardDelArticleById(id: number): Promise<Article> {
  const response = await instance.delete<Article>(`/article/${id}`, { headers: { Authorization: userStore.token } })
  return response.data
}

export async function getAllTagsByStatus(status: string) {
  const articleList = await getArticleListByStatus(status)
  let tags: Set<string> = new Set()
  for (const article of articleList) {
    tags = union(tags, new Set(article.tags))
  }
  return [...tags]
}
