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

export async function getUserInfoById(userId: string) {
  const userInfo = await instance.get<UserPublicInfoDto>(`/users/${userId}`)
  return userInfo.data
}

export async function tokenRefresh() {
  const newToken = await axios.get<string>('http://localhost:5939/users/refresh', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  })
  return newToken.data
}

export function setTokenTest(token: string) {
  localStorage.setItem('token', token)
}
