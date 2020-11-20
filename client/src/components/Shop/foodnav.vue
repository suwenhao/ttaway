<template>
  <div class="food-nav">
    <div class="not-food" v-if="tabs.length===0">
      <div class="img">
        <img :src="require('@/assets/images/not-search.png')" alt="">
      </div>
      <div class="text">
        暂无食品
      </div>
    </div>
    <Scroll :data="tabs" class="food-left" :style="{height: height}" v-show="tabs.length>0">
      <van-sidebar @change="tabChange" v-model="activeKey">
        <van-sidebar-item :title="item.name" v-for="(item, i) in tabs" :badge="calcDot(item)" :key="i"/>
      </van-sidebar>
    </Scroll>
    <Scroll :probeType="3" @scroll="scroll" :listenScroll="true" ref="foodContent" :data="tabs" :style="{height: height}" v-show="tabs.length>0" class="food-content">
      <div class="content">
        <div ref="listGroup" class="tab-box" v-for="(item, i) in tabs" :key="i">
          <div class="tab-head" :id="`ref${item._id}`" :ref="`ref${item._id}`">
            <span class="name">{{item.name}}</span>
            <span class="description">{{item.description}}</span>
          </div>
          <div class="food-item" v-for="(jtem, j) in item.children" :key="j">
            <div class="item-left">
              <img :src="`${IMAGE_URL}${jtem.image_path}`" alt="">
            </div>
            <div class="item-right">
              <div class="irt">
                <h3 class="overtext">{{jtem.name}}</h3>
                <p class="description overtext">{{jtem.description}}</p>
                <p class="rate">
                  <span>月销{{jtem.month_sales}}份</span>
                  <span>好评率{{jtem.rating * 20}}%</span>
                </p>
                <van-tag type="warning" v-if="jtem.discount<10"> {{jtem.discount}}折</van-tag>
              </div>
              <div class="irb">
                <div class="price">
                  <span>￥{{calcPrice(jtem)}}</span>
                  <del v-if="jtem.discount < 10">￥{{jtem.price}}</del>
                </div>
              </div>
              <div class="irb irbr">
                <div class="btns">
                  <a v-if="calcFoodCartNum(jtem)>0" calss="reduce" @click="reduceNum(jtem)"></a>
                  <span v-if="calcFoodCartNum(jtem)>0">{{calcFoodCartNum(jtem)}}</span>
                  <a class="add" @click="addNum(jtem)"></a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="i===tabs.length-1" style="height: 200px;"></div>
        </div>
      </div>
    </Scroll>
    <van-popup
      class="popup"
      v-model="specShow"
      closeable
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="popup-box">
        <div class="popup-box-header">
          <div class="left-img">
            <img :src="IMAGE_URL + food.image_path" alt="">
          </div>
          <div class="right-info">
            <h3>
              <p>{{food.name}}</p>
              <h4 v-if="Object.keys(food).length>0">已选: {{selectSpec(food)}}</h4>
            </h3>
            <div>
              <span>￥{{calcPrice(food)}}</span>
              <s>￥{{food.price}}</s>
            </div>
          </div>
        </div>
        <div class="popup-box-main">
          <div class="main-top">
            <div class="main-t-text">
              数量
            </div>
            <div class="btns">
              <a calss="reduce" @click="reduceSpecNum(food)"></a>
              <span>{{food.num}}</span>
              <a class="add" @click="addSpecNum(food)"></a>
            </div>
          </div>
          <div class="specs-box" v-if="Object.keys(specObj).length>0">
            <div class="specs-item" v-for="(jtem,j ) in Object.keys(specObj)" :key="j">
              <p>{{jtem.split('|')[1]}}</p>
              <span class="spec-btn">
                <van-button @click="changeSpecCurrent(item, j)" :type="item._id===curentSpec[j]?'info':'default'" size="mini" v-for="(item, i) in calcSpec(food)[jtem]" :key="i">
                  {{item.name}}
                </van-button>
              </span>
            </div>
          </div>
        </div>
        <div class="popup-box-footer">
          <van-button block round  type="danger" @click="addSpecCart">加入购物车</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// @ts-ignore
import { getShopInfo } from '@/service'
// @ts-ignore
import { IMAGE_URL } from '@/config'
// @ts-ignore
import { timebigsmall } from '@/utils'
import { namespace } from 'vuex-class';
import Scroll from '@/components/Scroll.vue'
const GlobalModule = namespace('global');
const ShopModule = namespace('shop');

@Component({
  components: {
    Scroll
  },
})
export default class FoodNav extends Vue {
  activeKey: number = 0
  tabs: any = []
  listHeight = []
  scrollY = -1
  specShow: boolean = false
  specs: any = []
  food: any = {}
  curentSpec = []
  specObj: any = {}
  IMAGE_URL: string = IMAGE_URL
  // 改变购物车数量方法
  @ShopModule.Mutation('changeCart') changeCart;
  @ShopModule.State(state => state.cart) cart;
  @Prop({
    type: Array,
    default: []
  }) foods!: any;
  @Prop(Object) data!: any;
  @Prop() height!: any;
  @Prop({
    type: Boolean,
    default: false
  }) fixed!: boolean;
  // 监听食品变动
  @Watch('foods')
  foodsValue(newVal, oldVal){
    this.tabs = this.formatTabs()
    this.$nextTick(() => {
      this._calculateHeight()
    })
  }
  // 监听食品列表滚动
  @Watch('scrollY')
  changeScrollY(newY) {
    const listHeight = this.listHeight
    // 当滚动到顶部， newY>0
    if (newY > 0) {
      this.activeKey = 0
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < listHeight.length; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (!height2 || (-newY >= height1 && -newY < height2)) {
        this.activeKey = i
        return
      }
    }
    // 当他滚动到底部且-newY 大于最后一个元素的上限
    this.activeKey = listHeight.length - 2
  }
  // 弹出变动
  @Watch('specShow')
  specShowValue(newVal, oldVal){
    if (!newVal) {
      this.curentSpec = []
    }
  }
  // 计算食品购物车变动数量
  calcFoodCartNum (jtem) {
    if (this.cart&&this.cart[jtem.shop_id]) {
      return this.cart[jtem.shop_id][jtem._id]?this.cart&&this.cart[jtem.shop_id][jtem._id].num:0
    } else {
      return 0
    }
  }
  // 选中的规格
  selectSpec (food) {
    let selectName = ''
    this.curentSpec.forEach(jtem => {
      let newFood = food.specs.filter(item => item._id === jtem)
      selectName += newFood[0].specs_name + ' ' + newFood[0].name + '/'
    })
    return selectName
  }
  // 处理规格数据
  calcSpec (food) {
    let newFood = Object.assign({}, food)
    let specObj = {}
    food.specs.forEach(item => {
      let key = item.specs_id + '|' + item.specs_name
      if (specObj[key]) {
        specObj[key].push(item)
      } else {
        specObj[key] = []
        specObj[key].push(item)
      }
    })
    return specObj
  }
  // 改变规格
  changeSpecCurrent (spec, j) {
    let newarr = Object.assign([], this.curentSpec)
    newarr[j] = spec._id
    this.curentSpec = newarr
  }
  // 
  reduceSpecNum (food) {
    let newFood = Object.assign({}, food)
    if (newFood.num===1){
      return
    }
    newFood.num--
    this.food = newFood
  }
  addSpecNum (food) {
    let newFood = Object.assign({}, food)
    newFood.num++
    this.food = newFood
  }
  addSpecCart () {
    let newFood = Object.assign({}, this.food)
    newFood.curentSpec = this.curentSpec
    newFood.selectSpec = this.selectSpec(newFood)
    this.changeCart({
      _id: newFood.shop_id,
      data: newFood,
      spec: true,
      type: 'add'
    })
    this.specShow = false
    console.log(newFood)
  }
  // 获取营业状态
  noopen(item) {
    return timebigsmall(item.startTime, item.endTime)
  }
  // 切换导航
  tabChange (index) {
    let ref = this.tabs[index]._id
    this.$nextTick(() => {
      let dom = document.querySelector('#ref' + ref)
      // @ts-ignore
      this.$refs.foodContent.scrollToElement(dom)
    })
  }
  // 计算高度
  _calculateHeight() {
    // 列表高度
    this.listHeight = []
    // 食品列表
    const list: any = this.$refs.listGroup || []
    let height = 0
    this.listHeight.push(height)
    for (let i = 0; i < list.length; i++) {
      // 每一个列表距离顶部的高度
      let item = list[i]
      height += item.clientHeight
      this.listHeight.push(height)
    }
  }
  // 获取食品列表滚动的y轴
  scroll (pos) {
    this.scrollY = pos.y
    // console.log(pos)
  }
  addNum (jtem) {
    // 未营业状态不可添加
    if (this.noopen(this.data)) return;
    if (jtem.specs.length>1) {
      this.specShow = true
      let newFood = Object.assign({}, jtem)
      newFood.num = 1
      this.food = newFood
      this.specObj = this.calcSpec(newFood)
      Object.keys(this.specObj).forEach(jtem => {
        let spec = this.specObj[jtem][0]
        this.curentSpec.push(spec._id)
      })
      return
    } else {
      this.changeCart({
        _id: jtem.shop_id,
        data: jtem,
        type: 'add'
      })
    }
  }
  // 减去购物车
  reduceNum (jtem) {
    this.changeCart({
      _id: jtem.shop_id,
      data: jtem,
      type: 'reduce'
    })
  }
  calcDot (item: any) {
    let num = 0
    if (this.cart&&this.cart[this.data._id]) {
      //
      Object.keys(this.cart[this.data._id]).map(jtem => {
        let food = this.cart[this.data._id][jtem]
        if (food.data.cateInfo._id === item._id) {
          num+=food.num
        }
      })
    }
    return num===0?false:num
  }
  calcPrice (jtem) {
    return jtem.discount < 10 ? (jtem.discount/10 * jtem.price).toFixed(2) : parseFloat(jtem.price).toFixed(2)
  }
  // 处理食品信息
  formatTabs () {
    let tabs = []
    let tab = {}
    if (this.foods.length>0) {
      this.foods.forEach((item) => {
        if (tab[item.cateInfo._id]&&tab[item.cateInfo._id].children) {
          item.num = 0
          tab[item.cateInfo._id].children.push(item)
        } else {
          tab[item.cateInfo._id] = {
            name: item.cateInfo.name,
            description: item.cateInfo.description,
            children: []
          }
          item.num = 0
          tab[item.cateInfo._id].children.push(item)
        }
      })
    }
    for(let key in tab) {
      tabs.push({
        _id: key,
        description: tab[key].description,
        children: tab[key].children,
        name: tab[key].name
      })
    }
    return tabs
  }
}
</script>
<style lang="less" scoped>
.food-nav{
  height: 100%;
  position: relative;
  .popup{
    /deep/ .van-popup__close-icon--top-right{
      top: 10px;
      right: 10px;
    }
    .popup-box{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 10px;
      box-sizing: border-box;
      padding: 0px 10px 10px;
      &-header{
        display: flex;
        .left-img{
          flex: 0 0 80px;
          padding: 10px;
          height: 80px;
          display: flex;
          img{
            flex: 1;
            width: 80px;
            height: 80px;
            border-radius: 5px;
          }
        }
        .right-info{
          padding: 10px 0;
          padding-right: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3{
            font-size: 16px;
            h4{
              font-size: 12px;
              color: #888;
            }
          }
          >div{
            display: flex;
            height: 20px;
            line-height: 20px;
            align-items: center;
            span{
              color: red;
            }
            s{
              margin-left: 5px;
              font-size:12px;
            }
          }
        }
      }
      &-main{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .main-top{
          display: flex;
          height: 30px;
          line-height: 30px;
          align-items: center;
          justify-content: space-between;
          .main-t-text{
            font-size: 14px;
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
        }
        .specs-box{
          flex: 1;
          overflow-y: scroll;
          padding-bottom: 10px;
          .specs-item{
            padding-top: 5px;
            p{
              font-size: 14px;
              margin-bottom: 5px;
            }
            .spec-btn{
              overflow: hidden;
              .van-button{
                width: 90px;
                height: 28px;
                font-size: 12px;
              }
            }
          }
        }
      }
      &-footer{
        .van-button{
          background-color: #ffd84d;
          border: 1px solid #ffd84d;
          color: #222;
        }
      }
    }
  }
  .not-food{
    display: flex;
    flex-direction: column;
    align-items: center;
    .img{
      padding-top: 20px;
      padding-bottom: 10px;
    }
    .text{
      font-size: 14px;
      color: #666;
    }
  }
  .food-left{
    left: 0;
    width: 80px;
    position: absolute;
    overflow: hidden;
    top: 0;
    background-color: #fafafa;
    .van-sidebar{
      width: 80px;
    }
  }
  .food-content{
    margin-left: 80px;
    overflow: hidden;
    .tab-head{
      padding: 10px 5px;
      color: #666;
      display: flex;
      align-items: center;
      .name{
        font-size: 14px;
        font-weight: bold;
      }
      .description{
        font-size: 11px;
        margin-left: 10px;
      }
    }
    .food-item{
      position: relative;
      padding: 8px 5px;
      .item-left{
        width: 95px;
        height: 95px;
        overflow: hidden;
        position: absolute;
        left: 5px;
        top: 9px;
        border: 1px solid #eee;
        img{
          width: 95px;
          height: 95px;
          display: block;
        }
      }
      .item-right{
        padding-left: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
  .van-sidebar{
    .van-sidebar-item{
      padding: 12px 6px;
      font-size: 13px;
    }
    .van-sidebar-item--select{
      border-color: #696c0b;
    }
  }
}
</style>