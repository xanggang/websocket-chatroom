import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.sequelize = {
    dialect: 'mysql',
    hostname: 'localhost',
    port: 3306,
    database: 'chatroom-pro',
    password: 'xang_gang1057516363'
  };
  return config;
};
