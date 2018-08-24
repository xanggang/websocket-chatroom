import { Controller } from 'egg';

export default class NspController extends Controller {
  public async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    nsp.emit('router', {msg: '这里是路由exchange返回', clientId: client, message: '收到的message为' + message.my});
  }

  public async newmsg() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;
    nsp.emit('router', {msg: '这里是newmsg路由返回', clientId: client, message: '收到的message为' + message.my});
  }

  public async sendMsg() {
    const { ctx, app } = this;
    const socket = ctx.socket;
    const nsp = app.io.of('/');
    const user = socket.user
    const message = ctx.args[0] || {};
    const client = socket.id;
    // console.log(payload);
    const msg = ctx.helper.parseMsg('broadcast', message, { client }, user);

    nsp.emit('broadcast', msg);
    // const client = socket.id;
    // nsp.to('demo1').emit('online', {
    //   msg: '这里是房间demo1'
    // });
    // nsp.clients((error, clients) => {
    //   if (error) throw error;
    //   nsp.emit('broadcast', {message: clients, client});
    // });
  }
}
