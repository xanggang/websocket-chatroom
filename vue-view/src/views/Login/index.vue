<template>
  <div class="login-container">
    <img class="bg" src="../../assets/bg1.jpg" height="1080" width="750"/>
    <div class="content">
      <div class="user-avatar">
        <img src="../../assets/avatar.jpg" />
      </div>
      <div class="user-name">
        <van-icon name="contact" />
        <van-field v-model="userName" placeholder="请输入用户名" class="input" required/>
      </div>
      <div class="user-name">
        <van-icon name="contact" />
        <van-field v-model="password" placeholder="请输入密码" type="password" class="input" required/>
      </div>
      <van-button class="_button login" type="default" @click="login">登录</van-button>
      <div class="register" @click="linkToRegister">前往注册</div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import { login } from '../../service'

  @Component({
    name: 'login',
    components: {}
  })
  export default class HelloWorld extends Vue {
    userName = ''
    password = ''

    login() {
      if (!this.userName) {
        this.$toast('请输入正确的用户名')
        return
      }
      if (!this.password) {
        this.$toast('请输入正确的密码')
        return
      }
      login({
        userName: this.userName,
        passWord: this.password
      }).then(() => {
        this.$router.push('./room')
      })
    }

    linkToRegister() {
      this.$router.push('./register')
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
      height: 6rem;
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
        margin-top: 0.6rem;
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
          margin-top: 1.5rem;
        }
      }
      ._button {
        margin: 0.5rem auto 0 auto;
      }
      .register {
        margin-top: 0.2rem;
        font-size: 14px;
        color: #999;
        width: 4.9rem;
        text-align: right;
        cursor: pointer;
        &:hover {
          color: $blue;
        }
      }
    }
  }
</style>
