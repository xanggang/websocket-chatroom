import { Service } from 'egg';


/**
 * Account Service
 */
interface onlineUserRules {
  socketId: string,
  userId: number,
  room?: string
}
export default class onlineUser extends Service {
  public async online(id: string, userId: number, room: string = 'default'): Promise<onlineUserRules> {
    const data = {
      socketId: id,
      userId,
      room
    }
    const user = await this.ctx.model.OnlineUser.createOnlineUser(data);
    return user
  }

  /**
   * 通过连接id查找用户
   */
  public async searchUserBySocketId(socketId: string): Promise<Array<onlineUserRules>> {
    const user = await this.app.model.OnlineUser.findOne({
      where: {
        socketId
      }
    });
    return user
  }
}
