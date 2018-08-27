<template>
  <div class="container">
    <div class="user-avatar" :style="{background: user.defaultColor || color}">
      <img :src="user.avatar" v-if="isShowImg">
      {{user.nick}}
    </div>
    <p class="msg-content">
      {{msg}}
    </p>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  const randomColor = require('randomcolor');
  interface user {
    defaultColor?: string
  }
  @Component({
    name: 'msgItem'
  })
  export default class MsgItem extends Vue {
    @Prop() private msg!: string;
    @Prop() private user!: user;
    @Prop({default: false}) private isShowImg!: boolean;

    color = '#fff'
    created() {
      if (this.user.defaultColor) {
        return
      }
      this.color = randomColor()
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem 0.3rem;
    margin-top: 0.20rem;
    .user-avatar {
      flex-shrink: 0;
      width: 0.60rem;
      height: 0.60rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.20rem;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .msg-content {
      font-size: 0.26rem;
      color: #fff;
      display: inline-block;
      background-color: cornflowerblue;
      border-radius: 0.10rem;
      padding: 0.10rem;
    }
  }
</style>
