<template>
  <div class="payFooter-page">
    <div></div>
    <div class="pay-btn">
      <div class="left">
        <span class="price">￥{{calcmoney}}</span>
        <span class="origin">已优惠￥{{parseFloat(calcprice - calcmoney).toFixed(2)}}</span>
      </div>
      <div class="right">
        <van-button :loading="loading" size="small" type="primary" @click="pay">支付</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
// @ts-ignore
import { activePrice } from "@/utils";
// @ts-ignore
import { saveOrder } from "@/service";
// @ts-ignore
import StorageModel, { SHOPINFO, TOKEN, USERID } from "@/utils/storage";

const ShopModule = namespace("shop");
const Storage = new StorageModel();

@Component({
  computed: {
    calcmoney() {
      if (Object.keys(this.cart).length > 0 && this.cart[this.shop._id]) {
        let arr = Object.values(this.cart[this.shop._id]);
        let price = 0;
        arr.forEach((item: any) => {
          price += item.num * this.calcPrice(item.data);
        });
        let newPrice = activePrice(this.shop.activitie_data, price);
        return newPrice.toFixed(2);
      } else {
        return Number(0).toFixed(2);
      }
    },
    calcprice() {
      if (Object.keys(this.cart).length > 0 && this.cart[this.shop._id]) {
        let arr = Object.values(this.cart[this.shop._id]);
        let price = 0;
        arr.forEach((item: any) => {
          price += item.num * item.data.price;
        });
        return price.toFixed(2);
      } else {
        return Number(0).toFixed(2);
      }
    }
  }
})
export default class PayFooter extends Vue {
  shop = Storage.get(SHOPINFO);
  loading: boolean = false;
  @ShopModule.State(state => state.cart) cart;
  @ShopModule.Mutation("clearCart") clearCart;
  @Prop(String) remark!: string;
  @Prop(String) person!: string;
  @Prop(String) address!: string;
  @Prop(String) tel!: string;
  calcPrice(jtem) {
    return jtem.discount < 10
      ? ((jtem.discount / 10) * jtem.price).toFixed(2)
      : parseFloat(jtem.price).toFixed(2);
  }
  async pay() {
    this.loading = true;
    let { erron, data, message } = await saveOrder({
      remark: this.remark,
      person: this.person,
      address: this.address,
      tel: this.tel,
      json: {
        order: this.cart[this.shop._id],
        shop: this.shop
      }
    });
    if (erron === 0) {
      this.clearCart({
        _id: this.shop._id
      });
      this.$toast("下单成功");
      setTimeout(() => {
        this.$router.push({ name: "order" });
      }, 500);
    }
    this.loading = false;
  }
}
</script>
<style lang="less" scoped>
.payFooter-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pay-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #333;
    color: #fff;
    .left {
      padding-left: 15px;
      display: flex;
      align-items: center;
      .price {
        font-size: 18px;
      }
      .origin {
        margin-left: 10px;
        font-size: 12px;
        color: #999;
      }
    }
    .right {
      padding-right: 10px;
      .van-button {
        padding: 0 20px;
      }
    }
  }
}
</style>