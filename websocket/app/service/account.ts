import { Service } from 'egg';
// import axios from "axios";
// import bcrypt from 'bcrypt-nodejs'
const bcrypt = require('bcrypt-nodejs')

interface userInfo {
  userName: string,
  nick: string,
  passWord: string,
  gender: string,
  avatarUrl: string,
}

interface user {
  id: number,
  userName: string,
  nick: string,
  defaultColor?: string,
  avatarUrl?: string
}
/**
 * Account Service
 */
export default class Account extends Service {
  /**
   * 检查用户名是否存在
   */
  public async checkUserName(userName: string) {
    const user = await this.app.model.Account.findOne({
      where: {
        userName: userName
      }
    });
    if (user) {
      return user.dataValues
    } else {
      return null
    }
  }

  /**
   * 加密密码
   */
  public encryptPassWord(passWord: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(passWord, salt)
  }

  /**
   * 创建账户
   */
  public async createUser(userInfo: userInfo): Promise<string> {
    const passWord = this.service.account.encryptPassWord(userInfo.passWord)
    const tmp = Object.assign({}, userInfo, {passWord: passWord})
    const user = await this.ctx.model.Account.createAccount(tmp);
    const token = await this.service.account.getToken(user.dataValues)
    return token
  }

  /**
   * 生成token
   */
  public async getToken(userInfo: userInfo): Promise<string> {
    const token = this.app.jwt.sign({ user: userInfo }, this.app.config.jwt.secret);
    return token
  }

  /**
   * 对比密码
   */
  public async checkPassWord(passWord: string, hashPassWord: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(hashPassWord, passWord, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
  /**
   * 解码
   */
  public decrypt(token: string): user {
    const { user } = this.app.jwt.verify(token, this.app.config.jwt.secret);
    return {
      id: user.id,
      userName: user.userName,
      nick: user.nick,
      defaultColor: user.defaultColor,
      avatarUrl: user.avatarUrl
    }
  }
}
