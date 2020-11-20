<template>
  <div class="dropdown-menu" :class="fixed?'fixed':''">
    <van-dropdown-menu active-color="#696c0b">
      <van-dropdown-item @close="closeMenu" @open="openChange" v-model="value" :options="option"/>
      <van-dropdown-item @close="closeMenu" @open="openChange" :title="active.name" ref="item">
        <div class="filters">
          <div class="filters-main" :class="fixed?'':'filter-max'">
            <dl>
              <dt>优惠活动 (单选)</dt>
              <dd>
                <div
                  @click="radioClick(item)"
                  class="radio-item"
                  :class="active.val == item.val?'active':''"
                  v-for="(item,i) in promotionList"
                  :key="i">
                  {{item.name}}
                </div>
              </dd>
            </dl>
          </div>
          <div class="btns">
            <van-button block type="default" @click="onClear">清除</van-button>
            <van-button block color="#ffd84d" type="info" @click="onConfirm">确认</van-button>
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
  
</template>
<script lang="ts">
// @ts-ignore
import { getPromotionList } from '@/service'
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({

})
export default class DropdownMenu extends Vue {
  value: number = 0;
  @Watch('value')
  onChangeValue(newVal: string, oldVal: string){
    // todo...
    this.$emit('change', newVal)
  }
  @Prop({
    type: Boolean,
    default: false
  }) readonly fixed!: boolean;
  option = [
    { text: '综合排序', value: 0 },
    { text: '好评优先', value: 1 },
    { text: '销量最高', value: 2 },
    { text: '起送价最低', value: 3 },
    { text: '配送费最低', value: 4 },
    { text: '距离最近', value: 5 }
  ]
  promotionList: any = [];
  active = {
    val: null,
    name: '筛选'
  }
  async getPromotionList () {
    let {erron, data} = await getPromotionList({})
    // console.log(data)
    if (erron === 0) {
      this.promotionList = data
    }
  }
  radioClick (val) {
    this.active = val
  }
  onClear () {
    this.active = {
      val: null,
      name: '筛选'
    }
    this.$emit('clearFilter')
    this.closeItem()
  }
  onConfirm () {
    this.$emit('filter', this.active.val)
    this.closeItem()
  }
  closeItem () {
    // @ts-ignore
    this.$refs.item.toggle();
  }
  openChange () {
    this.$emit('scrollMenu')
  }
  closeMenu () {
    this.$emit('close')
  }
  mounted () {
    this.getPromotionList()
  }
}
</script>
<style lang="less" scoped>
.dropdown-menu{
  &.fixed{
    position: fixed;
    background-color: #fff;
    width: 100%;
    top: 55px;
    left: 0;
    z-index: 10;
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
  }
  .filters{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    .btns{
      display: flex;
    }
    .filters-main{
      overflow-y: auto;
      dl{
        dt{
          padding: 10px;
          font-size: 14px;
        }
        dd{
          padding: 10px;
          padding-top: 0;
          display: flex;
          flex-wrap: wrap;
          .radio-item{
            background-color: #f5f5f5;
            align-items: center;
            text-align: center;
            border-radius: 3px;
            justify-content: center;
            flex: 0 0 31.33%;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            margin: 5px 1%;
          }
          .active{
            background-color: #fff7d5;
            color: #696c0b;
            font-weight: bold;
          }
        }
      }
    }
    .filter-max{
      max-height: 120px;
    }
  }
  
}
</style>