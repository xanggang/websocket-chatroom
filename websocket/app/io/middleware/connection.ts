import { Context } from 'egg';
import { uniqBy } from 'lodash';

export default function connectionMiddleware() {
  return async (ctx: Context, next: any) => {
    const { app, socket } = ctx;
    const nsp = app.io.of('/');
    const id = socket.id;
    const query = socket.handshake.query;
    const token = query.token
    const user = ctx.service.account.decrypt(token)

    // 如果没有登录， 直接踢出去
    if (!user) {
      socket.emit(id, {msg: token});
      socket.disconnect()
      return
    }
    // 将用户挂载到连接上
    socket.user = user

    nsp.clients((err, clients) => {
      if (err) throw err;
      // 获取 client 信息
      const clientsDetail: Array<object> = [];
      clients.forEach(client => {
        const _client = app.io.sockets.sockets[client];
        const _user = _client.user;
        clientsDetail.push(_user)
      });
      const userList = uniqBy(clientsDetail, 'id')
      // 更新在线用户列表
      nsp.emit('online', userList)
    });

    // const userList = util(nsp.connected)
    // nsp.emit('online', userList)

    await next();

  };
}
