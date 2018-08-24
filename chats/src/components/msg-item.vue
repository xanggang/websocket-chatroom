<template>
  <div class="container">
    <div class="user-avatar">
      <img :src="user.avatar">
    </div>
    <p class="msg-content">
      {{msg}}
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      msg: String,
      user: Object
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx 30rpx;
    margin-top: 20rpx;
    .user-avatar {
      flex-shrink: 0;
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20rpx;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .msg-content {
      font-size: 26rpx;
      color: #fff;
      display: inline-block;
      background-color: cornflowerblue;
      border-radius: 10rpx;
      padding: 10rpx;
    }
  }
</style>
