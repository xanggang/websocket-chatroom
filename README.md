在上一篇文章中， 我们用egg实现了基本的聊天室功能， 本章我们在其基础上进行一个小升级， 
添加用户登录、注册的功能， 添加查询聊天室成员的功能。在本章中， 通过token来进行用户识别， 通过mysql来保存用户信息， 将会用到egg的对应插件。
### 前端部分
效果图
![](https://user-gold-cdn.xitu.io/2018/8/29/16584438de43d77a?w=1536&h=728&f=gif&s=743095)
简化了项目， 一共只有三个页面， 但是我会按照完整的项目来调整规范，
项目结构

```
|-- src
    |-- assets  // 需要打包的静态资源
    |-- components // 公共组建
    |-- service // service层， 处理api和数据
    |-- stores // vuex管理
    |-- style
        |-- animate.scss  // 过渡动画
        |-- button.scss  // 基础组建样式， 全局覆盖vant的样式
        ...
        |-- index.scss  // 收集全部的样式， 同意导入
        |-- mixin.scss  // 公共的mixin
        |-- var.scss    // 样式声明
    |-- util 
        |-- ajax 
        |-- io
    |-- views
        ... // 具体的路由
    app.vue  // vue入口
    main.ts  // 入口文件
    router.ts //vue-router
    store.ts  // vuex 全局方法，入口
    vue.config.js // vue配置
```
#### vue.config.js
这里要提一下， 
开发的时候egg在7001端口， vue在8080端口 明显会跨域， 所以要设置一下代理
另一个， 我想将vue打包出来后直接放到egg的public/web下， 这样就不需要手动搬运了， 所以添加了
baseUrl、outputDir两个配置， 同时在egg里面有一个默认的html模板， 直接导入打包后的vue文件，
我的整个项目构成

顶级目录
    |-- vue-view  前端部分
    |-- egg  node部分
```
module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true
      }
    }
  },
  baseUrl: 'public/web/',
  outputDir: '../websocket/app/public/web', // 指向后端的public目录，
  filenameHashing: false
}

```
#### 封装的util
```
 // util/ajax
import axios from 'axios'
// 通过导入store， 更改全局的变量来实现在vue外更改vue组件的状态 
import store from '../store'
const CONFIG = {
  // 此处应该根据vue环境切换baseUrl， 通过process.env.VUE_APP_SECRET 来获取当前环境
  // baseURL: 'http://127.0.0.1:7001',
  timeout: 5000
}
const axiosInstance = axios.create(CONFIG)

// ts声明
interface options {
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  showLoading?: boolean,
  head?: object,
  data?: any,
  showErr?: boolean
}

export default function (options: options) {
  // 默认展示loading
  options.showLoading = options.hasOwnProperty('showLoading') ? options.showLoading : true;
  // 默认展示err
  options.showErr = options.hasOwnProperty('showErr') ? options.showErr : true;
  options.showLoading && store.commit('changeLoading', true);
  // 从localStorage获取token
  const token: string | null = window.localStorage.getItem('token');
  const showErr = options.showErr

  let arg :any = {}
  arg.url = options.url
  arg.method = options.method
  arg.method === 'get'
    ? arg.params = options.data
    : arg.data = options.data
  arg.headers = {
    // 'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
  if (token) {
    arg.headers = Object.assign(arg.headers, {token: token})
  }
  if (options.head) {
    arg.headers = Object.assign(arg.headers, options.head)
  }
  return axiosInstance(arg)
    .then(res => {
    // 更改组建状态
      options.showLoading && store.commit('changeLoading', false)
      return res.data.detail
    })
    .catch(err => {
      options.showLoading && store.commit('changeLoading', false)
      const message = err.response.data.message
      // 更改组建状态
      showErr && store.dispatch('changeToast', {message: message, type: 'err'})
      return Promise.reject(err)
    })
}
```
封装的IO， 很简略了。。
```
// util/io
import io from 'socket.io-client';
const uri = '/'
const socket = function (token: string):any {
  const _io = io(uri, {
    query: {
      token
    }
  });
  _io.on('connect', function(){
    const id = _io.id;
    _io.on(id, (msg: any) => {
      console.log('#receive,', msg);
    });
  });
  _io.on('disconnect', function(){
    console.log('断开连级');
  });
  _io.on('connect_error', function (e: any) {
    console.log(e, 'reconnect_error');
    _io.close()
  })
  return _io
}


export default socket

```

store管理， 主要是两个全局组建的状态
```
// store.ts
import Vue from 'vue'
import Vuex from 'vuex'
import Home from './stores/Home'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // vue 模块化
    Home
  },
  state: {
    // 全局状态，
    loading: false,
    toast: {
      message: '',
      status: false,
      type: 'toast'
    }
  },
  mutations: {
    changeLoading(state, bool: boolean) {
      state.loading = bool
    },
    changeToast(state, obj: {message: string, status: boolean, type: 'success' | 'err' | 'toast'}) {
      state.toast = obj
    }
  },
  actions: {
    通过调用这个方法， 在全局管理loading和toast
    changeToast({commit}, obj: {message: string, type: 'success' | 'err' | 'toast'}) {
      commit('changeToast', {message: obj.message, status: true, type: obj.type})
      setTimeout(() => {
        commit('changeToast', {message: '', status: false, type: 'toast'})
      }, 2000)
    }
  }
})

```

在router-view外面 我们通过vue的transition组件， 实现路由过渡效果，
```
// App.vue
<template>
  <div id="app">
    <Loading v-if="loading"/> 
    <Toast v-if="toast.status" :message="toast.message" :type="toast.type"/>
    <transition appear name="fade">
        <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Loading from './components/Loading.vue'
  import Toast from './components/Toast.vue'
  @Component({
    name: 'App',
    components: { Loading, Toast }
  })
  export default class Index extends Vue {
    get loading() {
      return this.$store.state.loading
    }
    get toast() {
      return this.$store.state.toast
    }

    mounted() {
    }
  }
</script>
```
对应的动画效果, 在main中全局引入

```
// 这里也可以使用第三方的动画库， 实现更多炫酷效果
@keyframes animatIn {
  0% {
    transform: translate(-100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
@keyframes animatOut {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}
.fade-enter {
  transform: translate(-100%, 0);
  position: absolute!important;
  z-index: 999;
  top: 0;
  left: 0;
}
.fade-enter-active {
  animation: animatIn 0.2s;
  position: absolute!important;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
}
.fade-leave {
  transform: translate(0, 0);
}
.fade-leave-active {
  animation: animatOut 0.2s;
}
```
service一共只有三个接口  登录 注册， 确认用户名
```
// service/account.ts
import ajax from '../utils/ajax'

interface registerRule {
  userName: string,
  nick: string,
  passWord: string,
  // gender: string
}
export function register(data: registerRule) {
  return ajax({
    url: './api/register',
    method: 'post',
    data: data
  })
}

export function login(data: { userName: string, passWord: string}) {
  return ajax({
    url: './api/login',
    method: 'post',
    data: data
  }).then(res => {
    window.localStorage.setItem('token', res)
  }).catch(err => {
    return Promise.reject(err)
  })
}

export function checkUserName(data: string): Promise<boolean> {
  return ajax({
    url: './api/checkUserName',
    method: 'post',
    data: {userName: data}
  })
}


```
 登录和注册的逻辑就懒得贴了
```
<template>
  <div class="container">
    <Header :onlineUser="onlineUser"/> // 头部显示头衔的组件， 背景是由ajax请求过来的
    <MsgItem v-for="(msg, index) in msgList"
             :msg="msg.data.message"
             :user="msg.user"
             :key="index" />
    <Send @sendMsg="sendMsg"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MsgItem from '../../components/MsgItem.vue'
  import Header from '../../components/Header.vue'
  import Send from '../../components/Send.vue'
  import io from '../../utils/io'
  let socket: any = undefined
  @Component({
    name: 'room',
    components: {
      MsgItem,
      Header,
      Send
    },
  })
  export default class Index extends Vue {
    msgList: Array<object> = []
    onlineUser: Array<object> = []

    // 点击发送， 触发sendMsg事件， 在node监听
    sendMsg(msg: string): void {
      socket.emit('sendMsg', msg)
    }

    mounted() {
    // 在连接websocket时， 需要将token传过去， 用于用户识别
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        setTimeout(() => {
          this.$router.push('./login')
        }, 1000)
        return
      }

      socket = io(token)
      socket.on('online', (data: Array<object>) => {
      // 由后端发起的online事件， 更新所有的在线用户
        console.log(data);
        this.onlineUser = data
      })
      socket.on('broadcast', (data: object) => {
      // 消息广播
        console.log(data);
        this.msgList.push(data)
      })
    }
  }
</script>
```


### 后端部分
因为涉及到了数据库， 所以我们需要引入新的包，
- Sequelize -> sequelize 是一个广泛使用的 ORM 框架，它支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多个数据源。
- randomcolor -> 随机生成颜色， 用于头像背景， 代替上传头像的功能
- sequelize-cli -> 数据库初始化表，生成model
- bcrypt-nodejs -> 密码加密解密工具， 将用户密码加密后存入数据库，加强数据安全
- egg-jwt  -> 基于token的验证体系， 将数据加密成token传给前端。
- egg-validate -> 参数验证

按照官方文档，一桶安装和配置。记得更新plugin和config.default

```
// config.default 新添加的配置
  config.sequelize = {
    dialect: 'mysql',
    hostname: 'localhost',
    port: 3306,
    database: 'chatroom',
    password: 'password'
  };

  config.jwt = {
    secret: "123456"
  };

```

Sequelize的使用， 包括生成model， 初始化表，在egg文档都有， 不在赘述

#### 相关的中间件、帮助函数
中间件
```
// app/middleware/error_handler
// 这就就是修改了一下官方的error_handler
export default function () {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { message: error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
}
```
```
// app/middleware/auth
// 权限中间件， 如果未登录， 直接返回err， 如果已经登录，将user解密后放在ctx， 便于后面的方法使用

export default async function auth(ctx, next) {
  const token = ctx.get('token')
  if (!token) {
    ctx.body = {
      msg: '未登录'
    }
    return
  }
  // 解密token 获取用户信息。 实现在下面
  const user = ctx.service.account.decrypt(token)
  ctx.user = user
  await next()
};

```

```
// app/extend/helper
// 用户Socket发送数据格式化
export default {
  parseMsg(action, message: string, metadata = {}, user = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);
    return {
      meta,
      data: {
        action,
        message
      },
      user
    };
  },
}
```
```
// app/extend/context
// 这里的方法可以在其他地方通过ctx调用
module.exports = {
  success(status, message, detail) {
    this.status = status
    this.body = {
      message: message,
      detail: detail
    }
  },
  err(status, message, detail) {
    this.status = status
    this.body = {
      message: message,
      detail: detail
    }
  },
}
```


#### 首页， 建立用户model
```
// app/model/Account
const randomColor = require('randomcolor');

interface userInfo {
  userName: string,
  nick: string,
  passWord: string,
  gender: string,
  avatarUrl: string,
}

const AccountModel = (app) => {
  const { INTEGER, BIGINT, CHAR} = app.Sequelize;

  const Account = app.model.define('accounts', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    userName: CHAR(255),
    nick: CHAR(255),
    gender: CHAR(1),
    avatarUrl: CHAR(255),
    passWord: CHAR(255),
    whenCreated: INTEGER,
    whoCreated: CHAR(255),
    deleted: INTEGER,
    defaultColor: CHAR
  }, {
    timestamps: false,
    tablseName: 'accounts',
  });

  Account.createAccount = async (userInfo): Promise<userInfo> => {
    return await app.model.Account.create({
      userName: userInfo.userName,
      nick: userInfo.nick,
      passWord: userInfo.passWord,
      gender: userInfo.gender | 0,
      avatarUrl: userInfo.avatarUrl,
      whenCreated: new Date().getTime(),
      whoCreated: 'admin',
      deleted: 0,
      defaultColor: randomColor() // 生成随机背景颜色， 代替头像
    })
  }

  return Account;
}

export default AccountModel

```

使用migrations初始刷数据库
```
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('online_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      socketId: STRING,
      userId: INTEGER,
      room: STRING,
      online_at: INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};

```
开始写controller了
```
app/router 
  router.get('/', controller.home.index);
  router.post('/api/register', controller.account.register);
  router.post('/api/checkUserName', controller.account.checkUserName)
  router.post('/api/login', controller.account.login);
  router.post('/api/test', auth, controller.account.test);

  io.of('/').route('sendMsg', io.controller.nsp.sendMsg);
```

一个一个来

```
// router
 router.get('/', controller.home.index);
 
// controller/home
import { Controller } from 'egg';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('index.html');
  }
}
// 访问首页的时候， 将html模板丢出去， 对应的模板位置在view/inndex.html
```
```
// app/views/inde.html
// 注意文件路径
// vue打包后会放在app/public/web文件夹下
<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <meta http-equiv=X-UA-Compatible content="IE=edge">
  <meta name=viewport content="width=device-width,initial-scale=1">
  <script src=/public/web/flexible.js></script>
  <title>vue-view</title>
  <link href=/public/web/css/app.css rel=preload as=style>
  <link href=/public/web/css/chunk-vendors.css rel=preload as=style>
  <link href=/public/web/js/app.js rel=preload as=script>
  <link href=/public/web/js/chunk-vendors.js rel=preload as=script>
  <link href=/public/web/css/chunk-vendors.css rel=stylesheet>
  <link href=/public/web/css/app.css rel=stylesheet>
</head>
<body>
<noscript><strong>We're sorry but vue-view doesn't work properly without JavaScript enabled. Please enable it to
  continue.</strong></noscript>
<div id=app></div>
<script src=/public/web/js/chunk-vendors.js></script>
<script src=/public/web/js/app.js></script>
</body>
</html>
```

#### 注册
```
// router 
  router.post('/api/register', controller.account.register);
  router.post('/api/checkUserName', controller.account.checkUserName)
  // 注册的时候回用到两个接口， 确认用户名是否存在
```
检查用户名是否存在
```
// controller/account/checkUserName
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
  public async checkUserName() {
    const body = this.ctx.request.body
    this.ctx.validate(checkUserNameRules, body)
    const oldName = await this.service.account.checkUserName(body.userName)
    this.ctx.success(200, 'success', !oldName)
  }
```

```
// service
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
```

创建账户
```
// router
router.post('/api/checkUserName', controller.account.register)
```
```
// controller/account
  public async register() {
    const body = this.ctx.request.body
    this.ctx.validate(registerRules, body)
    const oldName = await this.service.account.checkUserName(body.userName)
    if (oldName) {
      this.ctx.err(422, '用户名已存在', null)
      return
    }
    // 如果用户名已存在， 丢422， 否则调用service/createUser
    const token = await this.service.account.createUser(body)
    this.ctx.body = token
  }
```
```
// app/service/account
  /**
   * 加密密码
   */
  public encryptPassWord(passWord: string): string {
    // 使用bcrypt加盐
    const salt = bcrypt.genSaltSync(10)
    // 返回加密后的密码
    return bcrypt.hashSync(passWord, salt)
  }

  /**
   * 创建账户
   */
  public async createUser(userInfo: userInfo): Promise<string> {
    // 调用上面的encryptPassWord方法加密密码
    const passWord = this.service.account.encryptPassWord(userInfo.passWord)
    const tmp = Object.assign({}, userInfo, {passWord: passWord})
    // 调用model.Account.createAccount 在数据库生成新的用户
    const user = await this.ctx.model.Account.createAccount(tmp);
    // 调用下面的getToken方法， 将用户信息加密成token并且返回
    const token = await this.service.account.getToken(user.dataValues)
    return token
  }

  /**
   * 生成token
   */
  public async getToken(userInfo: userInfo): Promise<string> {
    // this.app.config.jwt.secret是配置文件里的，现在是写死的， 所以生成的token都是一样的
    // 预期的是根据当前时间戳生成secret， 然后将token和secret存在另一张表里， 
    // 这样就可以实现刷新token，‘挤下线’之类的操作
    const token = this.app.jwt.sign({ user: userInfo }, this.app.config.jwt.secret);
    return token
  }
```
#### 登录
``` 
// router 
  router.post('/api/checkUserName', controller.account.login
```

``` 
// controller.account.login
  public async login() {
    const body = this.ctx.request.body
    // 检查入参
    this.ctx.validate(loginRules, body)
    // 检查用户是否存在
    const user = await this.service.account.checkUserName(body.userName)
    if (!user) {
      this.ctx.err(422, '用户不存在', null)
      return
    }
    // 核对密码
    const isMatch = await this.service.account.checkPassWord(user.passWord, body.passWord)
    if (isMatch) {
    // 生成token
      const token = await this.service.account.getToken(user)
      this.ctx.success(200, 'success', token)
    } else {
      this.ctx.err(422, '密码错误', null)
    }
  }
```
```
// service.account.checkPassWord
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

```

```
// service.account.decrypt
// 中间件用到的， 解码token获取用户
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
```
前端请求这个借口之后， 就会存在本地，每次发送ajax的时候，在header里带上token，实现登录的功能。
node在中间件中， 取出token通过中间件获取用户， 然后挂载在ctx上，实现完整的登录逻辑

#### Socket相关
通过middleware/connection中间件， 在每次连接的时候，获取连接者用户信息，更新在线列表
connection中间件只会在每次连接的时候出发
```
// app/io/middleware/connection
import { Context } from 'egg';
import { uniqBy } from 'lodash';

export default function connectionMiddleware() {
  return async (ctx: Context, next: any) => {
    const { app, socket } = ctx;
    const nsp = app.io.of('/');
    const id = socket.id;
    // query是客户度连接的时候传进来的
    const query = socket.handshake.query;
    const token = query.token
    // 解码用户
    const user = ctx.service.account.decrypt(token)

    // 如果没有登录， 直接踢出去
    if (!user) {
      socket.emit(id, {msg: token});
      socket.disconnect()
      return
    }
    // 将用户挂载到连接上
    socket.user = user

    // 查询房间内的所有客户端
    nsp.clients((err, clients) => {
      if (err) throw err;
      // 获取 client 信息
      const clientsDetail: Array<object> = [];
      clients.forEach(client => {
        const _client = app.io.sockets.sockets[client];
        const _user = _client.user;
        // 这个_user就是房间内用户的信息
        clientsDetail.push(_user)
      });
      // uniqBy是lodash的方法， 数组去重
      // 同一个用户可以同时又多个连接的
      const userList = uniqBy(clientsDetail, 'id')
      // 更新在线用户列表
      nsp.emit('online', userList)
    });
    await next();
  };
}

```
发送信息， 客户端触发sendMsg事件
```
// router
io.of('/').route('sendMsg', io.controller.nsp.sendMsg);
```
```
// app/io/controller/nsp
  public async sendMsg() {
    const { ctx, app } = this;
    const socket = ctx.socket;
    const nsp = app.io.of('/');
    const user = socket.user
    const message = ctx.args[0] || {};
    const client = socket.id;
    // 先前封装的helper
    const msg = ctx.helper.parseMsg('broadcast', message, { client }, user);

    nsp.emit('broadcast', msg);
  }

```

这样基本业务就完成了， 中间还遇到几个坑，
Socket和普通的http走的不同的逻辑， 所以Socket无法使用全局的中间件。
在打包vue的时候， 注意文件路径。
ts的egg项目要先运行ci， 将ts编译之后再start
ts对egg插件的支持并不是很好，经常会遇到没有定义插件而无法编译的情况。
我偷懒直接改了node_module里的类型文件。
linux上面安装sql、远程数据库踩到的坑就不提了。。代码2小时， 环境要折腾几天。。
最后， 上项目代码
https://github.com/xanggang/websocket-chatroom
拉下来估计是跑不起来的...

溜了溜了