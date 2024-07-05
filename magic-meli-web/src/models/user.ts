export interface UserEntity {
  id: string
  username: string
  password: string
  email: string
  about: string
  level: string
}
export interface JwtTokenInfo {
  head: { alg: string }
  payload: { email: string; exp: number; iss: string; level: string; nbf: number; userId: string }
}
export interface UserLoginDto {
  userId: string
  password: string
}
export interface UserRegisterDto extends UserLoginDto {
  username: string
  email: string
}
export interface UserPublicInfoDto {
  id: string
  username: string
  about: string
  class: string
}
export interface UserVerifyInfoDto {
  userId: string
  email: string
  level: usersLevelStr
}
export enum usersLevelNum {
  guest,
  user,
  editor,
  admin
}
export enum usersLevelStr {
  guest = 'guest',
  user = 'user',
  editor = 'editor',
  admin = 'admin'
}
