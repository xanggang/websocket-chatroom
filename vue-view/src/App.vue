<template>
  <div id="app">
    <Loading v-if="loading"/>
    <Err v-if="toast.status" :message="toast.message" :type="toast.type"/>
    <transition appear name="fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Loading from './components/Loading.vue'
  import Err from './components/Toast.vue'
  @Component({
    name: 'App',
    components: { Loading, Err }
  })
  export default class Index extends Vue {
    get loading() {
      return this.$store.state.loading
    }
    get toast() {
      return this.$store.state.toast
    }

    mounted() {
    }
  }
</script>
<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    background-color: rgb(249, 249, 249);
  }

  #app {
    width: 7.5rem;
    height: 100vh;
    margin: 0 auto;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    border: 1px solid rgba(230, 230, 230, 0.99);
    overflow: hidden;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 0.26rem;
    height: 0.83rem;
    width: 100%;
    box-shadow: 2px 0 10px 10px rgba(240, 240, 240, 0.5);
  }
</style>
