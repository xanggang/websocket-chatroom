<template>
  <div class="container">
    <div class="header">XXX聊天室1</div>
    <msgItem msg="msg" :user="user"></msgItem>
    <msgItem msg="msg" :user="user"></msgItem>
    <send @send="sendMsg"/>
  </div>
</template>

<script>
import msgItem from '@/components/msg-item'
import send from '@/components/send'
const io = require('../../../static/weapp.socket.io')
let socket;
const url = 'http://127.0.0.1:7001/'
export default {
  data () {
    return {
      msg: 'zhelishi asjha skjsg djgsj dhg sjdhgs jdg',
      user: {
        avatar: 'https://f12.baidu.com/it/u=4263977612,1595937908&fm=76'
      },
      socket: undefined
    }
  },
  computed: {
  },
  components: {
    msgItem,
    send
  },
  methods: {
    sendMsg(e) {
      socket.emit('sendMsg', {msg: e});
    },
    createdSocket(id) {
      wx.showToast({
        title: '正在加入房间',
        icon: 'loading',
      })

      socket = io(url, {
        query: {
          id: id
        },
        transports: ['websocket'],
      })

      socket.on('connect_error', err => {
        wx.showToast({
          title: '加入房间失败',
          icon: 'loading',
          duration: 1000
        })
      })

      socket.on('online', e => {
        console.log("中间件", e)
      })
    }
  },
  mounted() {
    this.createdSocket(this.$root.$mp.query.id)
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: 26rpx;
      height: 83rpx;
      width: 100%;
      box-shadow: 2rpx 0 10rpx 10rpx rgba(240, 240, 240, 0.5);
    }
  }
</style>
