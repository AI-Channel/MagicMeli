export class User {
  _id: number
  _username: string
  _password: string
  constructor(id: number, username: string, password: string) {
    this._id = id
    this._username = username
    this._password = password
  }
  // check(username:string,password:string){
  //     const passwordPattern=new RegExp('^[a-zA-Z]w{5,17}$')

  // }
}
const testUser: User = new User(0, 'angelkawaii', '12345678')
export { testUser }
