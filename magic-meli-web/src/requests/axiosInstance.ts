import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

enum baseURL {
  elysia = 'http://localhost:5939'
}
const instance: AxiosInstance = axios.create({
  baseURL: baseURL.elysia,
  timeout: 3000,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  withCredentials: false
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    console.log(error.response)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    console.log(error.response)
    return Promise.reject(error)
  }
)

export default instance
