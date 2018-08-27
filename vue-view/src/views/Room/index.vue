<template>
  <div class="container">
    <Header :onlineUser="onlineUser"/>
    <MsgItem v-for="(msg, index) in msgList"
             :msg="msg.data.message"
             :user="msg.user"
             :key="index" />
    <Send @sendMsg="sendMsg"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import MsgItem from '../../components/MsgItem.vue'
  import Header from '../../components/Header.vue'
  import Send from '../../components/Send.vue'
  import io from '../../utils/io'
  let socket: any = undefined
  @Component({
    name: 'room',
    components: {
      MsgItem,
      Header,
      Send
    },
  })
  export default class Index extends Vue {
    user = {
      avatar: 'https://f12.baidu.com/it/u=4263977612,1595937908&fm=76'
    }
    msgList: Array<object> = []
    onlineUser: Array<object> = []

    sendMsg(msg: string): void {
      socket.emit('sendMsg', msg)
    }

    mounted() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        setTimeout(() => {
          this.$router.push('./login')
        }, 1000)
        return
      }

      socket = io(token)
      socket.on('online', (data: Array<object>) => {
        console.log(data);
        this.onlineUser = data
      })
      socket.on('broadcast', (data: object) => {
        console.log(data);
        this.msgList.push(data)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .container {

  }
</style>
