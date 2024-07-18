import { type UserLoginDto, type UserPublicInfoDto, type UserRegisterDto } from '@/models/user'
import instance from './axiosInstance'
import axios from 'axios'

export async function register(newUser: UserRegisterDto) {
  const token: string = await instance.post<UserRegisterDto, string>('/users/register', newUser)
  if (token) {
    localStorage.setItem('token', token)
    return token
  } else {
    throw new Error('Invalid register!')
  }
}

export async function login(user: UserLoginDto) {
  const token = await instance.post<string>('/users/login', user)
  if (token) return token.data
  else throw new Error('Invalid login!')
}

export async function getUserInfoByUserId(userId: string) {
  const userInfo = await instance.get<UserPublicInfoDto>(`/users/${userId}`)
  return userInfo.data
}

export async function tokenRefresh() {
  const newToken = await axios.get<string>(`${import.meta.env.VITE_API_HOST}/users/refresh`, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  })
  if (newToken) return newToken.data
  else throw new Error('Invalid token access!')
}
