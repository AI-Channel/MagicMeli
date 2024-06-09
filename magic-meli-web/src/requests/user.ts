import { type UserLoginDto, type UserPublicInfoDto, type UserRegisterDto, type UserVerifyDto } from '@/models/user'
import instance from './axiosInstance'
import { useUserStore } from '@/stores/store'


export async function register(newUser: UserRegisterDto) {
  const token: string = await instance.post<UserRegisterDto, string>('/user/register', newUser)
  if (token) {
    localStorage.setItem('token', token)
    return token
  } else {
    return new Error('Invalid register!')
  }
}
export async function login(user: UserLoginDto) {
  const token = await instance.post<UserLoginDto, string>('/user/login', user)
  if (token) {
    localStorage.setItem('token', token)
    return token
  } else {
    return new Error('Invalid login!')
  }
}
export async function getUserInfoById(id: number) {
  const userInfo = await instance.get<UserPublicInfoDto>(`/user/${id}`)
  return userInfo
}
export async function tokenVerify() {
  return await instance.get<UserVerifyDto>('/user/verify', { headers: { Authorization: localStorage.getItem('token')?.toString() } })
}
