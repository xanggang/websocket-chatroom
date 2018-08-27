<template>
  <div class="container">
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class HelloWorld extends Vue {
    @Prop() private message!: string;
    @Prop() private type!: 'success' | 'err' | 'toast';
    mounted() {
      if (this.type === 'success') {
        this.$toast.success(this.message);
        return
      }
      if (this.type === 'err') {
        this.$toast.fail(this.message);
        return
      }
      this.$toast(this.message);
    }
  }
</script>

<style scoped lang="scss">
  .container {

  }
</style>
