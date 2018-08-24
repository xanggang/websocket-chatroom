import {EggPlugin} from 'egg';

const plugin: EggPlugin = {
  // static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  security: {
    enable: false,
    package: 'egg-security',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize:  {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  }
};
export default plugin;
