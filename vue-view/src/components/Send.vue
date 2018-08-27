<template>
  <div class="send">
    <van-cell-group>
      <van-field
              v-model="value"
              center
              clearable
              placeholder=""
      >
        <van-button slot="button" size="small" type="primary" @click="sendMsg">发送消息</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  @Component({
    name: 'send'
  })
  export default class HelloWorld extends Vue {
    value: string = ''

    sendMsg() {
      this.$emit('sendMsg', this.value);
      this.value = ''
      this.$parent.$emit('click')
    }
  }
</script>

<style scoped lang="scss">
  .send {
    width: 100%;
    height: 0.8rem;
    box-shadow: -2px 0 10px 10px rgba(240, 240, 240, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
</style>
