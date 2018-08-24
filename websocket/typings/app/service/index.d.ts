// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Account from '../../../app/service/account';
import OnlineUser from '../../../app/service/onlineUser';
import Test from '../../../app/service/Test';
import WebSocket from '../../../app/service/webSocket';

declare module 'egg' {
  interface IService {
    account: Account;
    onlineUser: OnlineUser;
    test: Test;
    webSocket: WebSocket;
  }
}
