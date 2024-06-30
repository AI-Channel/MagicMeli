import Database, { SQLQueryBindings } from 'bun:sqlite'
import { SHA3 } from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'
import { UserEntity, UserLoginDto, UserPublicInfoDto, UserRegisterDto, UserUpdateDto, UserVerifyInfoDto, usersLevelStr } from './user.model'
import { userLevelNumtoStr, userLevelStrtoNum } from '../../libs/libs'
type queryMode = 'public' | 'verify' | 'all'

export class UserService {
  private db = new Database('MagicMeli.db')
  private idPattern = /^[\w_-]{4,20}$/
  private usernamePattern = /^[\S]{4,20}$/
  private passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/
  private emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  register(newUser: UserRegisterDto) {
    try {
      if (!this.idPattern.test(newUser.userId)) {
        throw new Error('Invalid id! Required only letters and numbers, length must in range [4,20]!')
      }
      if (!this.usernamePattern.test(newUser.username)) {
        throw new Error('Invalid username! length must in range [4,20]!')
      }
      if (!this.passwordPattern.test(newUser.password)) {
        throw new Error('Invalid password! Required letter and number at least, and length must in range [6,18] !')
      }
      if (!this.emailPattern.test(newUser.email)) {
        throw new Error('Invalid email!')
      }
      if (!this.isUserIdUnique(newUser.userId)) {
        throw new Error('This id is already exists')
      }
      const userEcho = this.db
        .query<UserVerifyInfoDto, SQLQueryBindings>(
          `INSERT INTO users (id, userId, username, password, email, level) 
          VALUES ($id, $userId, $username, $password, $email, $level) 
          RETURNING userId, email, level`
        )
        .get({
          $id: uuidv4(),
          $userId: newUser.userId,
          $username: newUser.username,
          $password: SHA3(newUser.password).toString(),
          $email: newUser.email,
          $level: userLevelStrtoNum(usersLevelStr.user)
        })
      return userEcho
    } catch (error) {
      console.warn(error)
      return false
    }
  }

  login(user: UserLoginDto) {
    try {
      const userInfo = this.getUserInfoById(user.userId, 'all') as UserEntity
      if (!userInfo) return false
      if (!this.idPattern.test(user.userId)) {
        throw new Error('Invalid user ID! Required only letters and numbers, length must in range [4,20]!')
      }
      if (!this.passwordPattern.test(user.password)) {
        throw new Error('Invalid password! Required letter and number at least, and length must in range [6,18] !')
      }
      if (user.userId.toLowerCase() === userInfo.userId.toLowerCase() && SHA3(user.password).toString() === userInfo.password) {
        return this.getUserInfoById(user.userId, 'verify') as UserVerifyInfoDto
      } else {
        throw new Error('ID and password are not correct!')
      }
    } catch (error) {
      console.warn(error)
      return false
    }
  }

  getUserInfoById(userId: string, mode: queryMode): false | UserEntity | UserVerifyInfoDto | UserPublicInfoDto {
    const userInfo = this.db.query<UserEntity, string>(`SELECT * FROM users WHERE userId = $userId COLLATE NOCASE`).get(userId)
    try {
      if (!userInfo) throw new Error('No such user!')
      const userPublicInfo: UserPublicInfoDto = {
        userId: userInfo.userId,
        username: userInfo.username,
        email: userInfo.email,
        about: userInfo.about,
        level: userLevelNumtoStr(userInfo.level)
      }
      const userVerifyInfo: UserVerifyInfoDto = { userId: userInfo.userId, email: userInfo.email, level: userLevelNumtoStr(userInfo.level) }
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
    } catch (error) {
      console.warn(error)
      return false
    }
  }

  getUsersList() {
    const usersInfo = this.db.query<UserPublicInfoDto, null>(`SELECT userId, username, email, about, level FROM users`).all(null)
    return usersInfo
  }

  modifyUserInfo = this.db.transaction((id: string, userNewInfo: UserUpdateDto) => {
    const secretId = this.getSecretIdByUserId(id)
    try {
      if (!secretId) throw new Error('UserId is not exist!')
    } catch (error) {
      console.warn(error)
      return false
    }
    const echo = this.db
      .prepare<UserEntity, SQLQueryBindings>(
        `UPDATE users SET userId = $userId, username = $username, password = $password, email = $email, about = $about 
        WHERE id = $id 
        RETURNING userId, username, email, about, level`
      )
      .get({
        $userId: userNewInfo.userId,
        $username: userNewInfo.username,
        $password: SHA3(userNewInfo.password).toString(),
        $email: userNewInfo.email,
        $about: userNewInfo.about,
        $id: secretId
      })
    if (!echo) return false
    else {
      const userInfoReturn: UserVerifyInfoDto = {
        userId: echo.userId,
        email: echo.email,
        level: userLevelNumtoStr(echo.level)
      }
      return userInfoReturn
    }
  })

  isUserIdUnique(userId: string) {
    const IdFound = this.db.query(`SELECT userId FROM users WHERE userId = $userId COLLATE NOCASE`).get(userId)
    return IdFound == null
  }

  getSecretIdByUserId(userId: string) {
    type SecretIdObj = { id: string } | false
    const secretId: SecretIdObj =
      this.db.query<SecretIdObj, string>(`SELECT id FROM users WHERE userId = $userId COLLATE NOCASE`).get(userId) ?? false
    return secretId ? secretId.id : false
  }

  getUserIdBySecretId(secretId: string) {
    type UserIdObj = { UserId: string } | false
    const userId: UserIdObj = this.db.query<UserIdObj, string>(`SELECT id FROM users WHERE userId = $userId COLLATE NOCASE`).get(secretId) ?? false
    return userId ? userId.UserId : false
  }
}
