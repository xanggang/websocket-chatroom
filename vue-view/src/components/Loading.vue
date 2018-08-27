<template>
  <div class="container">
    <div class="main">
      <van-loading color="black" class="loading"/>
      <div class="title">加载中</div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'loading'
  })
  export default class HelloWorld extends Vue {}
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100vh;
    /*background: #fff;*/
    position: absolute;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    .main {
      .title {
        text-align: center;
        margin-top: 15px;
      }
      .loading {

      }
    }
  }
</style>
