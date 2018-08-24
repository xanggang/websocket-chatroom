// import { Context } from 'egg';
//
// export default function robotMiddleware() {
//   return async (ctx: Context, next: any) => {
//     const { app, socket } = ctx;
//     const nsp = app.io.of('/');
//     const query = socket.handshake.query;
//     let user = await ctx.service.account.findAccountById(query.id)
//     nsp.emit('online', user)
//     await next();
//   };
// }
