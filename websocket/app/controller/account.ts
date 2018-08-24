import { Controller } from 'egg';

const registerRules = {
  userName: {
    type: 'string',
    max: 11,
    min: 1
  },
  nick: 'string',
  passWord: {
    type: 'string',
    max: 11,
    min: 6
  },
  gender: {
    type: 'string',
    required: false
  },
  avatarUrl: {
    type: 'string',
    required: false
  }
}

const loginRules = {
  userName: 'string',
  passWord: {
    type: 'string',
    max: 11,
    min: 6
  },
}

const checkUserNameRules = {
  userName: 'string',
}

export default class AccountController extends Controller {

  /**
   * 检查用户名
   */
  public async checkUserName() {
    const body = this.ctx.request.body
    this.ctx.validate(checkUserNameRules, body)
    const oldName = await this.service.account.checkUserName(body.userName)
    this.ctx.success(200, 'success', !oldName)
  }
  /**
   * 用户注册， 简单化
   */
  public async register() {
    const body = this.ctx.request.body
    this.ctx.validate(registerRules, body)
    const oldName = await this.service.account.checkUserName(body.userName)
    if (oldName) {
      this.ctx.err(422, '用户名已存在', null)
      return
    }
    const token = await this.service.account.createUser(body)
    this.ctx.body = token
  }

  /**
   * login 登陆， 获取token
   */
  public async login() {
    const body = this.ctx.request.body
    this.ctx.validate(loginRules, body)
    const user = await this.service.account.checkUserName(body.userName)
    if (!user) {
      this.ctx.err(422, '用户不存在', null)
      return
    }
    const isMatch = await this.service.account.checkPassWord(user.passWord, body.passWord)
    if (isMatch) {
      const token = await this.service.account.getToken(user)
      this.ctx.err(422, '密码错误', null)
      this.ctx.success(200, 'success', token)
    } else {
      this.ctx.err(422, '密码错误', null)
    }
  }

  public async test() {
    const { user } = this.ctx
    // this.ctx.body = 'user'
    // this.ctx.success(2100, '成功', user)
    this.ctx.err(401, '成功', user)
  }
}
