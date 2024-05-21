import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

enum baseURL {
  mock = 'https://magic-meli-12722872.mocker.coding.io',
  dataBase = 'http://localhost:5000',
  elysia = 'http://localhost:5939'
}
const instance: AxiosInstance = axios.create({
  baseURL: baseURL.elysia,
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
