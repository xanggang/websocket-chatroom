import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import baseConfig from './config'

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532592074103_5354';

  // add your config here
  config.middleware = ['errorHandler'];
  // config.errorHandler = {
  //   match: '/api',
  // }

  config.view = {
    cache: false,
    defaultExtension: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [
          'connection',
        ],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  config.config = baseConfig

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    hostname: 'localhost',
    port: 3306,
    database: 'chatroom',
    password: 'xanggang'
  };

  config.jwt = {
    secret: "123456"
  };

  return config;
};
