<template>
  <div class="login-container">
    <img class="bg" src="../../assets/bg1.jpg" height="1080" width="750"/>
    <div class="content">
      <div class="user-avatar">
        <img src="../../assets/avatar.jpg" />
      </div>
      <div class="user-name">
        <van-icon name="contact" />
        <van-field
                @blur="checkUserName"
                v-model="userName"
                placeholder="请输入用户名"
                class="input" required />
      </div>
      <div class="user-name">
        <van-icon name="password-not-view" />
        <van-field v-model="passwordOne" placeholder="请输入密码" class="input" required/>
      </div>
      <div class="user-name">
        <van-icon name="password-not-view" />
        <van-field v-model="passwordTwo" placeholder="再次输入密码" class="input" required/>
      </div>
      <div class="user-name">
        <van-icon name="like-o" />
        <van-field v-model="nick" placeholder="请输入昵称" class="input" required/>
      </div>
      <van-button class="_button login" type="default" @click="register">注册</van-button>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import { checkUserName, register} from '../../service'
  @Component({
    name: 'register',
    components: {}
  })
  export default class HelloWorld extends Vue {
    userName: string = ''
    passwordOne: string = ''
    passwordTwo: string = ''
    nick: string = ''
    flag: boolean = false

    checkUserName() {
      checkUserName(this.userName)
        .then(res => {
          this.flag = res
          if (!res) {
            this.$toast('该用户名已经被使用')
          }
        })
    }
    checkInfo() {
      if (!this.flag) {
        this.$toast('该用户名已经被使用')
      }
      if (!this.userName) {
        this.$toast('请输入正确的用户名')
        return
      }
      if (!this.passwordOne || !this.passwordTwo) {
        this.$toast('请输入正确的密码')
        return
      }
      if (this.passwordOne !== this.passwordTwo) {
        this.$toast('两次密码不一致')
        return
      }

      if (!this.nick) {
        this.$toast('请输入正确的昵称')
        return
      }
      return true
    }
    register() {
      if (this.checkInfo()) {
        register({
          userName: this.userName,
          passWord: this.passwordOne,
          nick: this.nick
        }).then(() => {
            this.$router.push('./login')
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/var";
  @import "../../style/mixin";
  .login-container {
    width: 100%;
    height: 100%;
    background: beige;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 0;
    }
    .content {
      position: absolute;
      width: 6rem;
      height: 7rem;
      border-radius: 10px;
      background: #fff;
      box-shadow: 2px 5px 21px 4px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      .user-avatar {
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        background: #fff;
        margin-left: 50%;
        left: -0.8rem;
        top: -0.8rem;
        border-radius: 50%;
        border: 0.1rem #fff solid;
        box-shadow: 0 0 0 5px #1c3d50;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .user-name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        margin-top: 0.3rem;
        position: relative;
        .input {
          width: 60%;
        }
        &:after {
          width: 70%;
          position: absolute;
          bottom: 0;
          content: '';
          height: 1px;
          box-shadow: inset 0px -1px 1px -1px $lightGray;
        }
        &:nth-child(2) {
          margin-top: 1rem;
        }
      }
      ._button {
        margin: 0.5rem auto 0 auto;
      }
    }
  }
</style>
