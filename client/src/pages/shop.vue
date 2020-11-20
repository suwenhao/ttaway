<template>
  <div class="shop" :class="activeName !== 'FoodNav'?'autoheight':''" ref="shopScroll">
    <div class="noid" v-if="noid">
      <div class="content">
        <img :src="require('@/assets/images/home-blank.jpg')" alt="">
        <h3>不正确的餐馆 ID</h3>
        <p>请重试</p>
        <van-button color="#ffd84d" type="primary">重试</van-button>
      </div>
    </div>
    <ModalAction @closeModal="actionShow=false" :data="data" v-if="actionShow"/>
    <SkShop v-if="skShow"/>
    <div class="top" ref="top">
      <div class="top-content">
        <nav>
          <img @error="errorImg" :src="data&&data.shop_header_image?`${IMAGE_URL}${data.shop_header_image}`:''" alt="">
          <van-icon name="arrow-left" @click="gotoHome"/>
        </nav>
        <div class="shop-avatar">
          <img :src="`${IMAGE_URL}${data&&data.avatar_image}`" alt="">
        </div>
        <div class="shop-info">
          <div class="title">
            <h3>
              <span>{{data&&data.name}}</span>
              <van-icon name="play" />
            </h3>
            <p>
              <span>评分 {{data&&data.rating}}</span>
              <span>月售 {{data&&data.sale}} 单</span>
              <span>蜂鸟快送约 {{data&&data.distance.order_lead_time}}</span>
            </p>
          </div>
          <div class="activity" v-if="data&&data.activitie_data.length>0">
            <div class="left">
              <span class="title" :style="{'background-color': `#${data&&data.activitie_data[0].icon_color}`}">
                {{data&&data.activitie_data[0].title}}
              </span>
              <span class="detail">{{data&&data.activitie_data[0].detail}}</span>
            </div>
            <div class="right" @click="actionShow=true">
              <span>{{data&&data.activitie_data.length}}个优惠</span>
              <van-icon size="7" class="iconfont" :name="`iconfont icontriangledownfill`" />
            </div>
          </div>
          <div v-else class="no-activity">
            无活动
          </div>
          <div class="notice">
            公告：{{data&&data.promotion_info}}。
          </div>
        </div>
      </div>
    </div>
    <div class="tab-box" ref="vtabs">
      <van-tabs v-model="activeName" class="tab">
        <van-tab title="点餐" name="FoodNav"></van-tab>
        <van-tab title="评价" name="FoodAssess"></van-tab>
        <van-tab title="商家" name="FoodShop"></van-tab>
      </van-tabs>
    </div>
    <div class="content" :style="{
      height: height
    }">
      <FoodNav :data="data" v-show="activeName === 'FoodNav'" :height="height" :foods="foods"></FoodNav>
      <FoodAssess v-if="activeName === 'FoodAssess'"/>
      <FoodShop :height="height" :data="data" v-if="activeName === 'FoodShop'"/>
    </div>
    <Footer :data="data" v-if="activeName === 'FoodNav'&&data" @getFooterHeight="getFooterHeight"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// @ts-ignore
import { getShopInfo } from '@/service'
// @ts-ignore
import { IMAGE_URL } from '@/config'
import SkShop from '@/components/Skeleton/skshop.vue'
import FoodNav from '@/components/Shop/foodnav.vue'
import FoodAssess from '@/components/Shop/foodassess.vue'
import FoodShop from '@/components/Shop/foodshop.vue'
import Footer from '@/components/Shop/footer.vue'
import ModalAction from '@/components/Shop/modalAction.vue'
import { namespace } from 'vuex-class';
const GlobalModule = namespace('global');

@Component({
  components: {
    SkShop,
    FoodNav,
    FoodAssess,
    FoodShop,
    Footer,
    ModalAction
  }
})
export default class Shop extends Vue {
  skShow: boolean = false
  activeName: string = 'FoodNav'
  height: any = '363px'
  footerHeight: any = 0;
  noid: boolean = false
  com: string = 'FoodNav'
  IMAGE_URL: string = IMAGE_URL
  data: any = null
  foods: any = []
  actionShow: boolean = false
  @GlobalModule.State(state => state.location) location;

  @Watch('activeName')
  activeNameChange(){
    this.resize()
  }
  @Watch('footerHeight')
  footerHeightChange(){
    this.resize()
  }
  async getShopInfo () {
    let { location } = this
    this.skShow = true
    let _id = this.$route.query._id
    if (!_id) {
      this.noid = true
      return
    }
    let { data } = await getShopInfo({
      _id,
      startgeohash: location.lat + ',' + location.lng
    })
    console.log(data)
    if (!data) {
      this.noid = true
      return
    } else {
      this.data = data
      this.foods = data.foods!
      setTimeout(() => {
        this.skShow = false
      }, 1000)
    }
  }
  getFooterHeight (footerHeight) {
    console.log(footerHeight)
    this.footerHeight = footerHeight
  }
  errorImg (e) {
    e.target.src = require('@/assets/images/shop_header_image.png')
  }
  gotoHome () {
    this.$router.push('/')
  }
  clacHeight () {
    // @ts-ignore
    let vth = this.$refs.vtabs.clientHeight
    // @ts-ignore
    let th = this.$refs.top.clientHeight
    this.height = document.body.clientHeight - vth - th - (this.activeName === 'FoodNav'?this.footerHeight:0) + 'px'
  }
  resize () {
    this.clacHeight()
    window.onresize = () => {
      this.clacHeight()
    }
  }
  mounted () {
    this.getShopInfo()
  }
}
</script>
<style lang="less" scoped>
.shop{
  height: calc(100% - 50px);
  overflow-y: scroll;
  background-color: #fff;
  &.autoheight{
    height: 100%;
  }
  .divk{
    height: 44px;
    width: 100%;
  }
  .tab{
    width: 100%;
    /deep/ .van-tabs__wrap{
      &::after{
        border-top: 0;
      }
    }
    /deep/ .van-tabs__line{
      background-color: @thcol;
    }
  }
  .noid{
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      margin-top: -40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h3{
        font-size: 16px;
        color: #222;
        font-weight: normal;
      }
      p{
        padding: 10px 0;
        font-size: 13px;
        color: #666;
      }
      img{
        display: block;
        width: 240px;
      }
      .van-button{
        width: 140px;
        color: #222 !important;
      }
    }
  }
  .top{
    height: 210px;
    .top-content{
      padding-top: 100px;
      position: relative;
      nav{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100px;
        left: 0;
        display: flex;
        align-items: center;
        overflow: hidden;
        img{
          width: 100%;
          display: block;
          margin-top: -10px;
        }
        .van-icon{
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 26px;
          color: #fff;
        }
        &::before{
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-image: linear-gradient(0deg,hsla(0,0%,100%,0),rgba(0,0,0,.5));
        }
      }
      .shop-avatar{
        position: absolute;
        width: 70px;
        height: 70px;
        display: flex;
        top: 45px;
        margin-left: -35px;
        left: 50%;
        border-radius: 2px;
        overflow: hidden;
        img{
          width: 70px;
          height: 70px;
        }
      }
      .shop-info{
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          width: 70%;
          text-align: center;
          h3{
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            font-size: 20px;
            span{
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .van-icon{
              margin-top: 3px;
            }
          }
          p{
            font-size: 10px;
            margin-top: 5px;
            color: #666;
            span{
              display: inline-block;
              margin-left: 5px;
            }
          }
        }
        .no-activity{
          font-size: 10px;
          margin-top: 5px;
          color: #666;
        }
        .activity{
          margin-top: 8px;
          width: 80%;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #696c0b;
          .left{
            white-space: nowrap;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title {
              width: 16px;
              height: 16px;
              display: inline-block;
              text-align: center;
              line-height: 16px;
              border-radius: 2px;
              color: #fff;
              margin-right: 5px;
            }
            .detail{
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
        .notice{
          margin-top: 8px;
          width: 80%;
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          color: #666;
        }
      }
    }
  }
}
</style>