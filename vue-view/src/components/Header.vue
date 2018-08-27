<template>
  <div class="header-container">
    <div class="header">
      <div class="user-avatar"
           v-for="(user, index) in onlineUser"
           v-if="index < 8"
           :style="{background: user.defaultColor || color}">
        {{user.nick}}
      </div>
      <div class="user-avatar" v-if="onlineUser.length > 7" :style="{background: 'pink'}">
        ···
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'Header'
  })
  export default class HelloWorld extends Vue {
    @Prop() private onlineUser!: Array<object>;
  }
</script>

<style scoped lang="scss">
  .header-container {
    width: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #333;
      font-size: 0.26rem;
      height: 0.83rem;
      width: 100%;
      border-bottom: 1px solid #eeeeee;
      box-shadow: 2px 0 10px 10px rgba(240, 240, 240, 0.5);
      padding: 0 0.2rem;
      box-sizing: border-box;
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
    }
  }
</style>
