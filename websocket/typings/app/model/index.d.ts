// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Account from '../../../app/model/Account';
import OnlineUser from '../../../app/model/OnlineUser';

declare module 'sequelize' {
  interface Sequelize {
    Account: ReturnType<typeof Account>;
    OnlineUser: ReturnType<typeof OnlineUser>;
  }
}
