import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.keys = '_1532592074103_5354';
  config.sequelize = {
    dialect: 'mysql',
    hostname: 'localhost',
    port: 3306,
    database: 'chatroom',
    password: 'xanggang'
  };
  return config;
};
