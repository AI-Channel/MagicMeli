import { getNowTimeStamp10, jwtDecode } from '@/scripts/libs'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
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
      if (tokenTimeLeft <= 0) console.warn('Need to relogin')
    }
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
