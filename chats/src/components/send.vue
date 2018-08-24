<template>
  <div class="content">
    <input type="text" class="input" v-model="value">
    <button class="send" type="primary" @click="sendMsg">发送</button>
  </div>
</template>

<script>
  export default {
    name: 'send',
    data() {
      return {
        value: ''
      };
    },
    methods: {
      sendMsg() {
        this.$emit('send', this.value)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: -2rpx 0 10rpx 10rpx rgba(240, 240, 240, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 5rpx;
    padding-left: 20rpx;
    .input {
      width: 580rpx;
      height: 100%;
      font-size: 28rpx;
    }
    .send {
      width: 100rpx;
      height: 100%;
      font-size: 26rpx;
      padding: 0;
    }
  }
</style>
