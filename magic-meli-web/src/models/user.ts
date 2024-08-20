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

export interface UserUpdateDto {
  userId: string
  username: string
  email: string
  about: string
}

export interface UserPublicInfoDto extends UserUpdateDto {
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
