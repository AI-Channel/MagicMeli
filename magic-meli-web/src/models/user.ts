export interface UserEntity {
  id: string
  username: string
  password: string
  email: string
  about: string
  class: string
}
export interface UserLoginDto {
  id: string
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
export interface UserVerifyDto {
  id: string
  email: string
  class: string
}
