<template>
  <div class="footer" v-show="data" ref="footer">
    <div v-if="data&&noopen(data)" class="noopen">
      未开业
    </div>
    <div class="cart-box" v-if="!(data&&noopen(data))&&cartshow">
      <div class="flaggb" @click="cartshow = false" :style="{height: height}"></div>
      <div class="cart-box-header">
        <h3>已选商品</h3>
        <div @click="clear">
          <van-icon name="delete" />
          <span>清空</span>
        </div>
      </div>
      <div class="cart-box-main">
        <div class="food-item" v-for="(jtem, j) in cartList" :key="j">
          <div class="item-left">
            <img :src="`${IMAGE_URL}${jtem.data.image_path}`" alt="">
          </div>
          <div class="item-right">
            <div class="irt">
              <h3 class="overtext">{{jtem.data.name}}</h3>
            </div>
            <div class="spec-text" v-if="jtem.spec">
              <span>
                {{jtem.data.selectSpec}}
              </span>
            </div>
            <div class="irb">
              <div class="price">
                <span>￥{{calcPrice(jtem.data)}}</span>
                <del v-if="jtem.data.discount < 10">￥{{jtem.data.price}}</del>
              </div>
              <div class="btns">
                <a v-if="calcFoodCartNum(jtem.data)>0" calss="reduce" @click="reduceNum(jtem.data, jtem.spec)"></a>
                <span v-if="calcFoodCartNum(jtem.data)>0">{{calcFoodCartNum(jtem.data)}}</span>
                <a class="add" @click="addNum(jtem.data, jtem.spec)"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip" v-if="!(data&&noopen(data))&&calcprice>0">
      {{tipprice}}
    </div>
    <div v-if="!(data&&noopen(data))" class="box">
      <div class="box-cart">
        <div class="box-cart-icon" :class="{'box-cart-active': cartNum>0}" @click="clickCartIcon">
          <van-icon size="24" name="cart" />
          <span class="num" v-if="cartNum!==0">{{cartNum}}</span>
        </div>
      </div>
      <div class="box-info">
        <span>￥{{calcmoney}} <s>￥{{calcprice}}</s></span>
        <span class="psf">另需配送费{{psf}}</span>
      </div>
      <div class="box-ment">
        <van-button type="primary" size="small" v-if="jsuan" @click="gotoPay">去结算</van-button>
        <van-button color="#444444" size="small" v-else>￥{{data&&data.starting_price}}起送</van-button>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts">
// @ts-ignore
import { IMAGE_URL } from '@/config'
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// @ts-ignore
import StorageModel, {SHOPINFO, TOKEN, USERID} from '@/utils/storage'
// @ts-ignore
import { timebigsmall } from '@/utils'
import { namespace } from 'vuex-class';

const Storage = new StorageModel();
const ShopModule = namespace('shop');

@Component({
  computed: {
    cartList () {
      if (Object.keys(this.cart).length>0&&this.cart[this.data._id]) {
        let arr = Object.values(this.cart[this.data._id])
        return arr
      } else {
        return []
      }
    },
    cartNum () {
      if (Object.keys(this.cart).length>0&&this.cart[this.data._id]) {
        let arr = Object.values(this.cart[this.data._id])
        let num = 0;
        arr.forEach((item: any) => {
          num+=item.num
        })
        return num
      } else {
        return 0
      }
    },
    calcmoney () {
      if (Object.keys(this.cart).length>0&&this.cart[this.data._id]) {
        let arr = Object.values(this.cart[this.data._id])
        let price = 0
        arr.forEach((item: any) => {
          price+=(item.num*this.calcPrice(item.data))
        })
        return price.toFixed(2)
      } else {
        return Number(0).toFixed(2)
      }
    },
    calcprice () {
      if (Object.keys(this.cart).length>0&&this.cart[this.data._id]) {
        let arr = Object.values(this.cart[this.data._id])
        let price = 0
        arr.forEach((item: any) => {
          price+=(item.num*item.data.price)
        })
        return price.toFixed(2)
      } else {
        return Number(0).toFixed(2)
      }
    },
    tipprice () {
      // @ts-ignore
      return parseFloat(this.calcmoney)>this.data.starting_price?'以满足起送价':`还差${parseFloat(this.data.starting_price-this.calcmoney).toFixed(2)}起送`
    },
    jsuan () {
      return this.calcmoney>this.data.starting_price
    },
    psf () {
      let date = new Date();
      let Y = date.getFullYear()+ '-';
      let M =  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate();
      let end = new Date(`${Y}${M}${D} 22:00:00`)
      return (date.getTime()>end.getTime()?this.data.shipping_fee[1]:this.data.shipping_fee[0]).toFixed(2)
    }
  },
  mounted () {
    this.getFooterHeight()
  }
})
export default class Footer extends Vue {
  cprice = 0;
  sprice = 0;
  height = '100%'
  IMAGE_URL: string = IMAGE_URL
  cartshow: boolean = false
  @Prop(Object) data!: any;
  @ShopModule.State(state => state.cart) cart;
  @ShopModule.Mutation('changeCart') changeCart;
  @ShopModule.Mutation('clearCart') clearCart;
  getFooterHeight (flag: boolean = true) {
    // @ts-ignore
    let fh = this.$refs.footer.clientHeight
    this.height = document.body.clientHeight - fh + 'px'
    if (flag){
      this.$emit('getFooterHeight', fh)
    }
  }
  @Watch('calcmoney')
  calcmoneyChange(){
    this.$nextTick(() => {
      if (this.cartshow) {
        this.getFooterHeight(false)
      } else {
        this.getFooterHeight()
      }
    })
  }
  @Watch('cartshow')
  cartshowChange(){
    this.$nextTick(() => {
      this.getFooterHeight(false)
    })
  }
  @Watch('cartList')
  cartListChange(newVal){
    if (newVal.length===0) {
      this.cartshow = false
      this.$nextTick(() => {
        this.getFooterHeight()
      })
    }
  }
  calcPrice (jtem) {
    return jtem.discount < 10 ? (jtem.discount/10 * jtem.price).toFixed(2) : parseFloat(jtem.price).toFixed(2)
  }
  calcFoodCartNum (jtem) {
    if (jtem.selectSpec) {
      if (this.cart&&this.cart[jtem.shop_id]) {
        let key = jtem._id+jtem.selectSpec
        return this.cart[jtem.shop_id][key]?this.cart&&this.cart[jtem.shop_id][key].num:0
      } else {
        return 0
      }
    } else {
      if (this.cart&&this.cart[jtem.shop_id]) {
        return this.cart[jtem.shop_id][jtem._id]?this.cart&&this.cart[jtem.shop_id][jtem._id].num:0
      } else {
        return 0
      }
    }
  }
  clickCartIcon () {
    // @ts-ignore
    if (this.cartList.length===0) {
      return
    }
    this.cartshow = !this.cartshow
  }
  reduceNum (jtem, spec) {
    this.changeCart({
      _id: jtem.shop_id,
      data: jtem,
      spec,
      type: 'reduce'
    })
  }
  addNum (jtem, spec) {
    this.changeCart({
      _id: jtem.shop_id,
      data: jtem,
      spec,
      type: 'add'
    })
  }
  clear () {
    this.$dialog.confirm({
      message: '是否清空购物车'
    }).then(() => {
      if (this.data) {
        this.clearCart({_id: this.data._id})
      }
    }).catch(() => {});
  }
  noopen(item) {
    return timebigsmall(item.startTime, item.endTime)
  }
  gotoPay () {
    Storage.set(SHOPINFO, this.data)
    this.$router.push({name: 'pay'})
  }
}
</script>
<style lang="less" scoped>
.footer{
  background-color: #333;
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  .tip{
    background-color: #00ff00;
    color: #222;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    text-align: center;
  }
  .cart-box{
    padding: 15px 15px 10px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    box-shadow: 5px 5px 10px 4px #ccc;
    .flaggb{
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0, .5);
      top: 0;
      left: 0;
      z-index: 10;
    }
    &-header{
      display: flex;
      justify-content: space-between;
      h3{
        font-size: 14px;
      }
      >div{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }
    &-main{
      max-height: 260px;
      overflow-y: scroll;
      .food-item{
        min-height: 68px;
        position: relative;
        padding: 8px 5px;
        border-bottom: 1px solid #ddd;
        &:last-child{
          border-bottom: 0;
        }
        .item-left{
          width: 65px;
          height: 65px;
          overflow: hidden;
          position: absolute;
          left: 5px;
          top: 9px;
          border: 1px solid #eee;
          img{
            width: 65px;
            height: 65px;
            display: block;
          }
        }
        .item-right{
          height: 65px;
          padding-left: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .spec-text{
            span{
              font-size: 12px;
              color: #666;
              background-color: #eee;
              display: inline-block;
              padding: 2px 10px;
            }
          }
          .irt{
            h3{
              font-size: 15px;
            }
           
            .overtext{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .description{
              font-size: 11px;
              color: #666;
              margin-top: 3px;
            }
            .rate{
              font-size: 10px;
              color: #666;
              margin-top: 3px;
              span{
                margin-right: 5px;
              }
            }
          }
          .irb{
            display: flex;
            justify-content: space-between;
            .price{
              span{
                color: #ff5339;
                font-size: 16px;
              }
              del{
                color: #666;
                font-size: 12px;
                margin-left: 5px;
              }
            }
            .btns{
              display: flex;
              align-items: center;
              margin-right: 5px;
              span{
                font-size: 16px;
                width: 28px;
                text-align: center;
              }
              a{
                display: block;
                width: 20px;
                height: 20px;
                background: url('~@/assets/images/reduce.png') no-repeat center;
                background-size: 100%;
              }
              .add{
                background: url('~@/assets/images/add.png') no-repeat center;
                background-size: 100%;
              }
            }
            &.irbr{
              justify-content: flex-end;
            }
          }
        }
      }
    }
  }
  .noopen{
    height: 50px;
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  .box{
    display: flex;
    flex: 1;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    &-cart{
      height: 50px;
      width: 60px;
      position: relative;
      &-icon{
        position: absolute;
        top: -10px;
        left: 10px;
        width: 45px;
        height: 45px;
        background-color: #333;
        border-radius: 50px;
        border: 5px solid #444;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon{
          color: #fff;
        }
        .num{
          position: absolute;
          top: -5px;
          right: -5px;
          font-size: 10px;
          border-radius: 30px;
          width: 20px;
          height: 20px;
          line-height: 21px;
          text-align: center;
          color: #fff;
          border: 1px solid #fff;
          background-color: rgba(255, 123, 0);
        }
      }
      &-active{
        background-color: @thcol;
        .van-icon{
          color: #333;
        }
      }
    }
    &-info{
      flex: 1;
      margin-left: 10px;
      color: #fff;
      display: flex;
      flex-direction: column;
      s{
        font-size: 12px;
        color: #888;
      }
      .psf{
        font-size: 10px;
        color: #888;
      }
    }
    &-ment{
      width: 120px;
      .van-button{
        width: 90%;
      }
    }
  }
}
</style>