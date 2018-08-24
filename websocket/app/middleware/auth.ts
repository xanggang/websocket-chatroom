
export default async function auth(ctx, next) {
  const token = ctx.get('token')
  if (!token) {
    ctx.body = {
      msg: '未登录'
    }
    return
  }
  const user = ctx.service.account.decrypt(token)
  ctx.user = user
  await next()
};
