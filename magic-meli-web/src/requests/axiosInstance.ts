import { autoToast, getNowTimeStamp10, jwtDecode } from '@/scripts/libs'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { tokenRefresh } from './user'

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
  async (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    const token = (config.headers.Authorization?.toString() ?? '').split(' ')[1]
    const tokenDecoded = jwtDecode(token)
    if (tokenDecoded) {
      const tokenTimeLeft = tokenDecoded.payload.exp - getNowTimeStamp10()
      if (tokenTimeLeft < 0) console.warn('Need to relogin')
      if (tokenTimeLeft > 0 && tokenTimeLeft <= 300) {
        const newToken = await tokenRefresh()
        localStorage.setItem('token', newToken)
      }
      // console.log(tokenTimeLeft)
    }
    // console.log(tokenDecoded)
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
    if (error.response?.status == 401) autoToast('未登录，无法访问', 'error')
    console.log(error.response)
    return Promise.reject(error)
  }
)

export default instance
