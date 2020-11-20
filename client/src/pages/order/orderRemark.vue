<template>
  <div class="order-remark" :class="{
    active: show
  }">
    <Header class="header-warp" @return="headerReturn" @rightClick="rightClick">
      订单备注
      <span slot="right">
        保存
      </span>
    </Header>
    <div class='order-remark-main'>
      <van-field
        v-model="message"
        rows="6"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入订单备注"
        show-word-limit
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Header from '@/components/Layout/Header.vue'
@Component({
  components: {Header}
})
export default class OrderRemark extends Vue {
  @Prop(Object) show!: any;
  message: string = ''
  @Emit('closeRemark')
  headerReturn () {}
  rightClick () {
    if (this.message==='') {
      this.$toast('请输入订单备注')
    } else {
      //
      this.$emit('saveRemark', this.message)
    }
  }
}
</script>
<style lang="less" scoped>
.order-remark{
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  right: -100%;
  z-index: 1999;
  transition: all 0.1s;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &.active{
    right: 0;
  }
  .order-remark-main{
    flex: 1;
  }
}
</style>