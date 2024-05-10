import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

export interface ArticleMeta {
  id: number
  name: string
  isDeleted: boolean
  timeLastModified: number
  category: string
  author?: string
  tags?: string[]
  brief?: string
}
export interface ArticleContent {
  id: number
  name: string
  content?: string
}

enum baseURL {
  mock = 'https://magic-meli-12722872.mocker.coding.io',
  dataBase = 'http://localhost:5000'
}
const instance: AxiosInstance = axios.create({
  baseURL: baseURL.dataBase,
  timeout: 5000,
  withCredentials: false
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default instance
