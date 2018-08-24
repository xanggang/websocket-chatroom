export default {
  parseMsg(action, message: string, metadata = {}, user = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);
    return {
      meta,
      data: {
        action,
        message
      },
      user
    };
  },
}