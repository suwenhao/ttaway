<template>
  <div class="order-detail-page">
    <Header class="header-warp" @return="headerReturn">订单详情</Header>
    <div class="order-content"></div>
  </div>
</template>
<script lang="ts">
// @ts-ignore
import orderMixin from "@/pages/mixins/order";
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import StorageModel, { TOKEN, USERID, ORDER_DETAIL } from "@/utils/storage";
const Storage = new StorageModel();

@Component({
  mixins: [orderMixin],
  created() {
    this.init();
    console.log(this.orderDetail);
  }
})
export default class OrderDetail extends Vue {
  orderDetail: any = {};
  headerReturn() {
    this.$router.push("/order");
  }
  init() {
    let data = Storage.get(ORDER_DETAIL);
    this.orderDetail = Object.assign({}, data);
  }
}
</script>
<style lang="less" scoped>
.order-detail-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;
  .order-content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>