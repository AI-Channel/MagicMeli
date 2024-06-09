import Database, { SQLQueryBindings } from 'bun:sqlite'
import { SHA3 } from 'crypto-js'
import jwt from 'jsonwebtoken'
import { jwtTokenSecret } from '../../libs/libs'
import { UserEntity, UserPublicInfoDto, UserVerifyInfoDto } from './user.model'

interface UserRegisterDto {
  id: string
  username: string
  password: string
  email: string
}
interface UserLoginDto {
  id: string
  password: string
}

export class UserService {
  private db = new Database('MagicMeli.db')
  private idPattern = /^[\w-]{4,20}$/
  private usernamePattern = /^[\S]{4,20}$/
  private passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[\w!@#$%^&*]{6,18}$/
  private emailPattern = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  register(newUser: UserRegisterDto) {
    try {
      this.patternMatch(newUser)
      if (!this.isIdUnique(newUser.id)) throw new Error('Id is already used!')
    } catch (error: any) {
      console.warn(error)
      return false
    }
    const userEcho = this.db
      .prepare<
        UserVerifyInfoDto,
        SQLQueryBindings
      >(`INSERT INTO users (id, username, password, email, class) VALUES ($id, $username, $password, $email, $group) RETURNING id,email,class`)
      .get({ $id: newUser.id, $username: newUser.username, $password: SHA3(newUser.password).toString(), $email: newUser.email, $class: 'user' })
    return userEcho
  }

  login(user: UserLoginDto) {
    const userInfo = this.getUserInfoById(user.id, 'all') as UserEntity
    try {
      this.patternMatch(user)
    } catch (error) {
      console.warn(error)
      return error as string
    }
    if (typeof userInfo != 'string' && user.id === userInfo.id && userInfo.password === SHA3(user.password).toString()) {
      return this.getUserInfoById(user.id,'verify') as UserVerifyInfoDto
    } else {
      return false
    }
  }

  getUserInfoById(userId: string, mode: string): string | UserEntity | UserVerifyInfoDto | UserPublicInfoDto {
    try {
      const userInfo = this.db.prepare<UserEntity, string>(`SELECT * FROM users WHERE id = $id`).get(userId)
      if (userInfo) {
        const userPublicInfo: UserPublicInfoDto = { id: userInfo.id, username: userInfo.username, about: userInfo.about, class: userInfo.class }
        const userVerifyInfo: UserVerifyInfoDto = { id: userInfo.id, email: userInfo.email, class: userInfo.class }
        switch (mode) {
          case 'public':
            return userPublicInfo
          case 'verify':
            return userVerifyInfo
          case 'all':
            return userInfo
          default:
            throw new Error('invalid query mode!')
        }
      } else {
        throw new Error('No such users')
      }
    } catch (error) {
      console.warn(error)
      return error as string
    }
  }

  private patternMatch(userInfo: UserRegisterDto | UserLoginDto) {
    if (!this.idPattern.test(userInfo.id)) {
      throw new Error('Invalid id! Required only letters and numbers, length must in range [4,20]!')
    }
    if ('username' in userInfo && !this.usernamePattern.test(userInfo.username)) {
      throw new Error('Invalid username! length must in range [4,20]!')
    }
    if (!this.passwordPattern.test(userInfo.password)) {
      throw new Error('Invalid password! Required letter and number at least, and length must in range [6,18] !')
    }
    if ('email' in userInfo && !this.emailPattern.test(userInfo.email)) {
      throw new Error('Invalid email!')
    }
  }

  private isIdUnique(id: string) {
    const IdFound = this.db.prepare(`SELECT id FROM users WHERE id = $id`).get(id)
    return IdFound == null
  }
}
