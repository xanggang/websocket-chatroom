const randomColor = require('randomcolor');

interface userInfo {
  userName: string,
  nick: string,
  passWord: string,
  gender: string,
  avatarUrl: string,
}

const AccountModel = (app) => {
  const { INTEGER, BIGINT, CHAR} = app.Sequelize;

  const Account = app.model.define('accounts', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    userName: CHAR(255),
    nick: CHAR(255),
    gender: CHAR(1),
    avatarUrl: CHAR(255),
    passWord: CHAR(255),
    whenCreated: INTEGER,
    whoCreated: CHAR(255),
    deleted: INTEGER,
    defaultColor: CHAR
  }, {
    timestamps: false,
    tablseName: 'accounts',
  });

  Account.createAccount = async (userInfo): Promise<userInfo> => {
    return await app.model.Account.create({
      userName: userInfo.userName,
      nick: userInfo.nick,
      passWord: userInfo.passWord,
      gender: userInfo.gender | 0,
      avatarUrl: userInfo.avatarUrl,
      whenCreated: new Date().getTime(),
      whoCreated: 'admin',
      deleted: 0,
      defaultColor: randomColor()
    })
  }

  return Account;
}

export default AccountModel
