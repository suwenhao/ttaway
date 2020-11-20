<template>
  <section class="shop-item" @click.stop="gotoShop(data._id)">
    <div class="mark" v-if="markShow" @click.stop="markShow=false">
      <div class="btn" @click.stop="notlike">不喜欢</div>
    </div>
    <div class="shop-info">
      <div class="logo">
        <img v-lazy="IMAGE_URL + data.avatar_image" alt="">
        <van-tag v-if="noopen(data)" mark size="medium" type="danger">未开业</van-tag>
      </div>
      <div class="main">
        <section class="title">
          <h3 class="shop-name">
            <span>
              {{data.name}}
            </span>
          </h3>
          <div class="supportWrap" @click.stop="openMark">
            <van-icon size="10" class="iconfont" name="iconfont iconarrow_left_fill" />
            <van-icon size="10" class="iconfont" name="iconfont iconmore_light" />
          </div>
        </section>
        <section class="rating">
          <van-rate
            readonly
            v-model="data.rating"
            allow-half
            size="10"
            gutter="1"
            void-icon="star"
            void-color="#eee"
          />
          月售{{data.sale}}单
        </section>
        <section class="piecewise_agent_fee">
          <div>
            ￥{{data.starting_price}}起送 | {{nigth?'夜间配送费':'配送费'}}￥{{nigth?data.shipping_fee[1]:data.shipping_fee[0]}}
          </div>
          <div class="right">
          {{parseFloat(data.distance.distance) | formatDistance}}km | {{data.distance.order_lead_time}}
          </div>
        </section>
      </div>
    </div>
    <div class="shop-activity" v-if="data.activitie_data.length>0">
      <div class="activity-list"  :class="activityH?'activityH':''">
        <div class="activity-item" v-for="(item, i) in data.activitie_data" :key="i">
          <span :style="{backgroundColor: '#'+item.icon_color}">{{item.title}}</span>
          <div class="item-text">{{item.detail?item.detail:'暂无描述'}}</div>
        </div>
      </div>
      <div class="activity-btn" @click.stop="openActivity">
        <span>{{data.activitie_data.length}}个活动</span>
        <van-icon size="7" class="iconfont" :name="`iconfont ${activityH?'icontriangledownfill':'icontriangleupfill'}`" />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// @ts-ignore
import { IMAGE_URL } from '@/config'
// @ts-ignore
import { timebigsmall } from '@/utils'
@Component({
  computed: {
    nigth () {
      var date = new Date()
      var currentHours = date.getHours()
      if (currentHours>=20) {
        return true
      } else {
        return false
      }
    }
  },
  filters: {
    formatDistance (value){
      return Math.round((value/1000)*100)/100
    }
  }
})
export default class ShopItem extends Vue {
  @Prop(Object) data!: any;
  IMAGE_URL: string = IMAGE_URL
  activityH: boolean = true;
  markShow: boolean = false;
  openActivity () {
    this.activityH = !this.activityH
  }
  noopen(item) {
    return timebigsmall(item.startTime, item.endTime)
  }
  notlike () {

  }
  openMark () {
    this.markShow = true
  }
  gotoShop (_id) {
    this.$router.push('/shop?_id='+_id)
  }
  mounted () {
    // console.log(this.data)
  }
}
</script>
<style lang="less" scoped>
.shop-item{
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  .mark{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color:rgba(0,0,0,.5);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn{
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 50px;
      font-size: 11px;
      text-align: center;
      line-height: 50px;
    }
  }
  .shop-info{
    display: flex;
    .logo{
      width: 76px;
      height: 62px;
      img{
        display: block;
        width: 61px;
        height: 61px;
        border: 1px solid #f5f5f5;
      }
    }
    .main{
      height: 62px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #666;
      .title{
        display: flex;
        justify-content: space-between;
        h3{
          font-size: 15px;
          color: #333;
          overflow: hidden;
          width: 250px;
          display: flex;
          span{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        .supportWrap{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 10px;
        }
      }
      .rating{
        font-size: 10px;
      }
      .piecewise_agent_fee{
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        .right{
          color: #999;
        }
      }
    }
  }
  .shop-activity{
    padding-top: 10px;
    margin-left: 80px;
    display: flex;
    font-size: 10px;
    justify-content: space-between;
    .activity-list{
      .activity-item{
        display: flex;
        
        margin-bottom: 3px;
        line-height: 16px;
        padding: 2px 0;
        span{
          color: #fff;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 2px;
          font-size: 12px;
        }
        .item-text{
          margin-left: 5px;
          color: #666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 180px;
        }
      }
    }
    .activityH{
      height: 40px;
      overflow: hidden;
    }
    .activity-btn{
      margin-top: 1px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
    }
  }
}
</style>