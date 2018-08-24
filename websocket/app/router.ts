import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io, middleware } = app;
  const { auth } = middleware
  router.get('/', controller.home.index);
  router.post('/api/register', controller.account.register);
  router.post('/api/checkUserName', controller.account.checkUserName)
  router.post('/api/login', controller.account.login);
  router.post('/api/test', auth, controller.account.test);

  io.of('/').route('sendMsg', io.controller.nsp.sendMsg);
};
