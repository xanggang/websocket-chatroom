
const OnlineUserModel = (app) => {
  const { INTEGER, BIGINT, STRING} = app.Sequelize;

  const OnlineUser = app.model.define('online_users', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    socketId: STRING,
    userId: INTEGER,
    online_at: INTEGER,
    room: STRING
  }, {
    timestamps: false,
    tablseName: 'accounts',
  });

  OnlineUser.createOnlineUser = async (data): Promise<any> => {
    return await app.model.OnlineUser.create({
      socketId: data.socketId,
      userId: data.userId,
      online_at: new Date().getTime(),
      room: data.room || 'default'
    })
  }

  return OnlineUser;
}

export default OnlineUserModel
