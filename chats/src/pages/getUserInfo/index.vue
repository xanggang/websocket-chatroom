<template>
  <div class="container">
    <button type="default" bindtap="default" open-type="getUserInfo" @getuserinfo="bindgetuserinfo"> 登陆 </button>
  </div>
</template>

<script>
  import ajax from '../../utils/ajax'
export default {
  data () {
    return {

    }
  },
  computed: {
  },
  components: {

  },
  methods: {
    bindgetuserinfo(userInfo) {
      wx.login({
        success: function (codeData) {
          console.log(userInfo, codeData);
          ajax({
            url: '/api/login',
            method: 'POST',
            data: {code: codeData.code, userInfo: userInfo.mp.detail.userInfo},
            success: function (res) {
              console.log('success', res);
              wx.navigateTo({
                url: '../index/main?id=' + res.id
              })
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
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
