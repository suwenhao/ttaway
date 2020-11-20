<template>
  <div class="pay-page">
    <Header class="header-warp" @return="headerReturn">确认订单</Header>
    <div v-if="show" class="page-content">
      <div class="content-main">
        <div class="address">
          <van-cell
            @click="gotoAddressList"
            v-if="address"
            :title="address.address"
            size="large"
            :label="address.name +' '+address.tel"
            is-link
          />
          <van-cell @click="gotoAddressList" v-else title="选择收货地址" size="large" is-link />
        </div>
        <div class="food-list">
          <van-panel :title="shop.name">
            <div class="panel-list">
              <van-notice-bar :scrollable="false">
                <van-icon name="smile-o" />
                <span>温馨提示：你的主食点了吗</span>
              </van-notice-bar>
              <div class="cart-list">
                <van-card
                  v-for="(item, i) in foodList"
                  :key="i"
                  :num="item.num"
                  :price="calcPrice(item.data)"
                  :desc="item.data.selectSpec?item.data.selectSpec:''"
                  :title="item.data.name"
                  :thumb="IMAGE_URL + item.data.image_path"
                  :origin-price="item.data.price"
                />
              </div>
              <van-cell title="配送费.蜂鸟配送" :value="'￥'+psf" />
              <van-cell title="红包/抵用券" is-link />
              <template v-for="(item, i) in shop.activitie_data">
                <van-cell
                  v-if="item.val==='jian'||item.val==='shou'||item.val==='xin'"
                  :key="i"
                  title
                  :label="item.detail"
                />
              </template>
              <van-cell class="calcmoney" label="优惠说明:满减和首单优惠同享" title="小计" :value="'￥'+calcmoney" />
            </div>
          </van-panel>
        </div>
        <div class="info">
          <van-cell title="订单备注" :label="remark" is-link @click="remarkShow=true" />
          <van-cell title="发票信息" value="该店不支持线上开发票" />
          <van-cell title="下单说明" label="下单后可在订单列表查看该订单详情和订单进度" />
        </div>
      </div>
    </div>
    <div v-if="!show" class="page-content">
      <Loading />
    </div>
    <div>
      <payFooter
        :tel="address&&address.tel"
        :person="address&&address.name"
        :address="address&&address.address"
        :remark="remark"
        :shop="shop"
      />
    </div>
    <orderRemark @closeRemark="remarkShow=false" @saveRemark="saveRemark" :show="remarkShow" />
  </div>
</template>
<script lang="ts">
import Cookies from "js-cookie";
// @ts-ignore
import { IMAGE_URL } from "@/config";
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import { getArealist } from "@/service";
// @ts-ignore
import { activePrice } from "@/utils";
// @ts-ignore
import orderMixin from "@/pages/mixins/order";
import payFooter from "@/components/Order/payFooter.vue";
import orderRemark from "./orderRemark.vue";
// @ts-ignore
import StorageModel, {
  SHOPINFO,
  SELECTADDRESS,
  TOKEN,
  USERID
} from "@/utils/storage";
import { namespace } from "vuex-class";

const Storage = new StorageModel();
const ShopModule = namespace("shop");

@Component({
  components: { payFooter, orderRemark },
  mixins: [orderMixin],
  computed: {
    token() {
      return Cookies.get(TOKEN) || null;
    },
    psf() {
      let date = new Date();
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate();
      let end = new Date(`${Y}${M}${D} 22:00:00`);
      return (date.getTime() > end.getTime()
        ? this.shop.shipping_fee[1]
        : this.shop.shipping_fee[0]
      ).toFixed(2);
    },
    calcmoney() {
      if (Object.keys(this.cart).length > 0 && this.cart[this.shop._id]) {
        let arr = Object.values(this.cart[this.shop._id]);
        console.log(arr)
        let price = 0;
        arr.forEach((item: any) => {
          price += item.num * this.calcPrice(item.data);
        });
        let newPrice = activePrice(this.shop.activitie_data, price);
        console.log(newPrice)
        return newPrice.toFixed(2);
      } else {
        return Number(0).toFixed(2);
      }
    }
  },
  created() {
    if (!this.token) {
      // console.log(this.$route.path)
      this.$router.push({ name: "login", query: { path: this.$route.path } });
      return;
    }
    this.init();
  }
})
export default class Pay extends Vue {
  shop = Storage.get(SHOPINFO);
  show = false;
  address = null;
  remark: string = "";
  remarkShow: boolean = false;
  IMAGE_URL: string = IMAGE_URL;
  @ShopModule.State(state => state.cart) cart;
  @ShopModule.Mutation("clearCart") clearCart;
  foodList = [];
  headerReturn() {
    Storage.remove(SELECTADDRESS);
    this.$router.push(`/shop?_id=${this.shop._id}`);
  }
  calcPrice(jtem) {
    return jtem.discount < 10
      ? ((jtem.discount / 10) * jtem.price).toFixed(2)
      : parseFloat(jtem.price).toFixed(2);
  }
  init() {
    let shopid = this.shop._id;
    if (this.cart && this.cart[shopid]) {
      let food = Object.keys(this.cart[shopid]).map(
        item => this.cart[shopid][item]
      );
      this.foodList = Object.assign([], food);
    }
    this.getArealist();
  }
  async getArealist() {
    this.show = false;
    let address = Storage.get(SELECTADDRESS);
    if (address) {
      this.address = address;
      this.show = true;
    } else {
      let { data, erron, message } = await getArealist({
        userId: Cookies.get(USERID)
      });
      this.show = true;
      if (erron === 0) {
        //
        if (data.length > 0) {
          let item = data.filter(item => item.isDefault);
          this.address = item[0];
          this.address.address =
            item[0].province +
            item[0].city +
            item[0].county +
            " " +
            item[0].addressDetail;
        }
      }
    }
  }
  saveRemark(message) {
    this.remarkShow = false;
    this.remark = message;
  }
  gotoAddressList() {
    this.$router.push("/addrlist/pay");
  }
}
</script>
<style lang="less" scoped>
.pay-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;
  .page-content {
    flex: 1;
    overflow-y: scroll;
    .content-main {
      margin: 10px;
    }
    .address {
      margin-bottom: 10px;
      .van-cell {
        border-radius: 5px;
        display: flex;
        align-items: center;
      }
      /deep/ .van-cell__title {
        font-weight: bold;
        .van-cell__label {
          color: #000;
          font-weight: normal;
        }
      }
    }
    .food-list {
      margin-bottom: 10px;
      .panel-list {
        .van-notice-bar {
          background-color: transparent;
          /deep/ .van-notice-bar__content {
            display: flex;
            align-items: center;
          }
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
        .van-cell.calcmoney {
          .van-cell__value {
            color: #000;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>