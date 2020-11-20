<template>
  <div class="order-page">
    <Header class="header-warp" @return="headerReturn">我的订单</Header>
    <div class="page-content">
      <div v-if="!this.token">请登录</div>
      <div class="order-list" v-else>
        <van-panel v-for="(item, i) in data" :key="i" :title="item.orderData.shop.name">
          <div class="cart-list" @click="gotoDetail(item)">
            <van-card
              v-for="(jtem, j) in item.orderData.order"
              :key="j"
              :num="jtem.num"
              :price="calcPrice(jtem.data)"
              :desc="jtem.data.selectSpec?jtem.data.selectSpec:''"
              :title="jtem.data.name"
              :thumb="IMAGE_URL + jtem.data.image_path"
              :origin-price="jtem.data.price"
            />
          </div>
          <div class="type">
            <span>订单状态：</span>
            <span
              :class="{
              green:item.orderType===4||item.orderType===5,
              orange: item.orderType!==4&&item.orderType!==5,
            }"
            >{{calcOrderType(item.orderType)}}</span>
          </div>
          <div class="moneys">
            <div>
              <span>优惠：</span>
              <span
                class="youh"
              >￥{{parseFloat(totalPrice(item.orderData) - totalMoney(item.orderData)).toFixed(2)}}</span>
            </div>
            <div>
              <span>实付款：</span>
              <span class="money">￥{{totalMoney(item.orderData)}}</span>
            </div>
          </div>
          <div class="btns">
            <van-button v-if="item.orderType===1" type="danger" size="small">取消订单</van-button>
            <van-button
              v-if="item.orderType===1"
              class="ycolor"
              color="#ffd84d"
              type="info"
              size="small"
            >支付</van-button>
            <van-button
              v-if="item.orderType===2"
              class="ycolor"
              color="#ffd84d"
              type="info"
              size="small"
            >提醒发货</van-button>
            <van-button
              v-if="item.orderType===3"
              class="ycolor"
              color="#ffd84d"
              type="info"
              size="small"
            >确认收货</van-button>
            <van-button
              v-if="item.orderType===4"
              class="ycolor"
              color="#ffd84d"
              type="info"
              size="small"
            >评价</van-button>
            <van-button
              v-if="item.orderType===5"
              class="ycolor"
              color="#ffd84d"
              type="info"
              size="small"
            >删除订单</van-button>
          </div>
        </van-panel>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Cookies from "js-cookie";
// @ts-ignore
import { IMAGE_URL } from "@/config";
// @ts-ignore
import { activePrice } from "@/utils";
// @ts-ignore
import { orderList } from "@/service";
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import myMixin from "@/pages/mixins/my";
// @ts-ignore
import StorageModel, { TOKEN, USERID, ORDER_DETAIL } from "@/utils/storage";

const Storage = new StorageModel();
@Component({
  mixins: [myMixin],
  computed: {
    token() {
      return Cookies.get(TOKEN) || null;
    }
  },
  created() {
    if (!this.token) {
      return;
    }
    this.init();
  }
})
export default class Order extends Vue {
  data: any = [];
  IMAGE_URL: string = IMAGE_URL;
  async init() {
    let { erron, data, message } = await orderList();
    if (erron === 0) {
      this.data = data;
    }
  }
  gotoDetail(item) {
    Storage.set(ORDER_DETAIL, item);
    this.$router.push("/orderDetail");
  }
  totalMoney(orderData) {
    let arr: any = Object.values(orderData.order);
    let price = 0;
    Object.keys(arr).forEach((item: any) => {
      let specPrice: any = this.calcPrice(arr[item].data);
      price += arr[item].num * specPrice;
    });
    let newPrice = activePrice(orderData.shop.activitie_data, price);
    return newPrice.toFixed(2);
  }
  totalPrice(orderData) {
    let arr: any = Object.values(orderData.order);
    let price = 0;
    Object.keys(arr).forEach((item: any) => {
      price += arr[item].num * arr[item].data.price;
    });
    return price.toFixed(2);
  }
  calcPrice(jtem) {
    return jtem.discount < 10
      ? ((jtem.discount / 10) * jtem.price).toFixed(2)
      : parseFloat(jtem.price).toFixed(2);
  }
  calcOrderType(orderType) {
    let map = {
      1: "未支付",
      2: "待发货",
      3: "待收货",
      4: "已完成",
      5: "已完成"
    };
    return map[orderType];
  }
}
</script>
<style lang="less" scoped>
.order-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;
  .page-content {
    flex: 1;
    margin: 10px;
    overflow-y: auto;
    .order-list {
      .van-panel {
        margin-bottom: 10px;
      }
      .van-card {
        background-color: #fff;
        .van-card__thumb {
          width: 50px;
          height: 50px;
          .van-image {
            border: 1px solid #ddd;
          }
        }
        .van-card__content {
          min-height: 50px;
        }
      }
      .moneys {
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        align-items: center;
        padding: 8px;
        > div {
          display: flex;
          align-items: center;
        }
        .youh {
          color: #999;
        }
        .money {
          color: #e82a2a;
          font-size: 14px;
        }
      }
      .type {
        border-top: 1px solid #ddd;
        padding: 8px;
        font-size: 12px;
        .orange {
          color: orange;
          font-size: 14px;
        }
        .green {
          color: green;
          font-size: 14px;
        }
      }
      .btns {
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: flex-end;
        padding: 5px;
        .van-button {
          margin-left: 5px;
        }
        .ycolor {
          color: #222 !important;
        }
      }
    }
  }
}
</style>